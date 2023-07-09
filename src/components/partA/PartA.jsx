import styled from "@emotion/styled";
import {
  Button,
  Divider,
  Drawer,
  Modal,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import PictureIcon from "../../assets/svgs/pictureIcon.svg";
import CustomTitleWithEdit from "ui/CustomTitleWithEdit";
import { useForm } from "@mantine/form";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import AWS from "aws-sdk";
import DeleteModal from "ui/DeleteModal";
import { ReactComponent as DownArrow } from "../../assets/svgs/arrowDown.svg";
import { ReactComponent as RightArrow } from "../../assets/svgs/arrowRight.svg";
import { ReactComponent as CVIcon } from "../../assets/svgs/cv.svg";
import { ReactComponent as Delete } from "../../assets/svgs/delete.svg";
AWS.config.update({
  accessKeyId: `${process.env.REACT_APP_AWS_ACESS_KEY}`,
  secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_KEY}`,
  region: `${process.env.REACT_APP_AWS_REGION}`,
  signatureVersion: "v4",
});

const BloodGroup = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1 rem;
`;
const PartAContainer = styled.div`
  display: block;
  width: 100%;
  height: fit-content;
  margin: 20px 0;
`;

const AboutMeContainer = styled.div`
  width: 100%;
`;
const BloodGroupContainer = styled.div`
  width: 100%;
  min-height: 30px;
  margin: 10px 0;
`;
const AboutMeText = styled.div`
  font-size: 0.8rem;
  color: #6e6e6e;
  margin-bottom: 10px;
`;

const DropzoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NoAboutMe = styled.div`
  text-align: center;
  color: #808080;
  font-size: 0.8rem;
`;
const StyledError = styled.div`
  text-decoration: none;
  word-break: break-word;
  color: #fa5252;
  font-size: calc(0.875rem - 0.125rem);
  line-height: 1.2;
  display: block;
`;
const ResumeContainer = styled.div`
  margin: 10px 0 20px 0;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(128, 128, 128, 0.5);
  box-shadow: 2px 2px 1px 1px rgba(128, 128, 128, 0.5);
  min-height: 50px;
`;
const ResumeLabelAndIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`;
const CVContainer = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  border: 1px solid rgba(128, 128, 128, 0.5);
  gap: 10px;
`;
const CVPreviewContainer = styled.div``;
function PartA() {
  const [aboutMe, setAboutMe] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [cv, setCV] = useState("");
  const [fileName, setFileNmae] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [showdelete, setShowDelete] = useState(false);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const form = useForm({
    initialValues: { aboutMe: "", bloodGroup: "", cv: "" },
    validate: {
      aboutMe: (value) =>
        value.length > 3 && value.length < 500
          ? null
          : "Please enter characters between 3 and 500",
      bloodGroup: (value) =>
        value.length ? null : "please select blood group",
      cv: (value) => (value ? null : "Please add CV"),
    },
  });
  function handleSubmit(values) {
    setAboutMe(values.aboutMe);
    setBloodGroup(values.bloodGroup);
    setCV(values.cv);
    setEditMode(false);
  }
  const handleFileSubmit = (files) => {
    let file = files[0];
    const uploadToS3 = async () => {
      if (!file) {
        return;
      }
      const params = {
        Bucket: `${process.env.REACT_APP_AWS_S3_BUCKET_NAME}`,
        Key: `${Date.now()}.${file.name}`,
        Body: file,
      };
      const { Location } = await s3.upload(params).promise();
      setFileNmae(file.path);
      setImageUrl(Location);
      console.log("uploading to s3", Location);
      form.setFieldValue("cv", Location);
      form.clearFieldError("cv");
    };
    uploadToS3();
  };

  const handleCVDelete = () => {
    setCV("");
    form.setFieldValue("cv", "");
    setShowDelete(false);
  };

  return (
    <PartAContainer>
      <DeleteModal
        opened={showdelete}
        onClose={() => setShowDelete(false)}
        callFunction={handleCVDelete}
      />
      <Drawer
        opened={editMode}
        onClose={() => setEditMode(false)}
        withCloseButton={false}
        position="right"
        size={"lg"}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Title
            size={"h6"}
            onClick={() => setEditMode(false)}
          >{`<   Bio`}</Title>
          <Textarea
            label="Write Something about yourself"
            placeholder="Write something here"
            {...form.getInputProps("aboutMe")}
            styles={{
              input: {
                backgroundColor: "rgba(242,244,249,1)",
                minHeight: "100px",
              },
            }}
          />
          <div style={{ margin: "20px 0" }}>
            {form.values.cv !== "" ? (
              <CVContainer>
                <div>CV Added succefully</div>
                <Divider size="sm" />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{fileName}</div>
                  <Delete
                    onClick={() => setShowDelete(true)}
                    width="25px"
                    height="25px"
                  />
                </div>
              </CVContainer>
            ) : (
              <Dropzone
                onDrop={(files) => handleFileSubmit(files)}
                onReject={() =>
                  form.setFieldError("cv", "Upload pdf file below 5 MB")
                }
                maxSize={5 * 1024 ** 2}
                multiple={false}
                accept={[PDF_MIME_TYPE]}
                styles={{
                  root: {
                    backgroundColor: "rgba(242,244,249,1)",
                    border: "0.125rem solid #ced4da",
                  },
                }}
              >
                <DropzoneWrapper>
                  <img
                    src={PictureIcon}
                    alt="img"
                    width={"50px"}
                    height={"50px"}
                  />
                  Drop File here
                </DropzoneWrapper>
              </Dropzone>
            )}

            {form.values.cv === "" && (
              <StyledError>{form.errors.cv}</StyledError>
            )}
          </div>
          <Select
            label="Blood Group"
            rightSection={<DownArrow width={"25px"} height={"25px"} />}
            placeholder="Select Blood Group"
            data={[
              { value: "A positive", label: "A positive" },
              { value: "AB positive", label: "AB positive" },
              { value: "B positive", label: "B positive" },
              { value: "O positive", label: "O positive" },
              { value: "A negative", label: "A negative" },
              { value: "AB negative", label: "AB negative" },
              { value: "B negative", label: "B negative" },
              { value: "O negative", label: "O negative" },
            ]}
            {...form.getInputProps("bloodGroup")}
            styles={{
              input: {
                backgroundColor: "rgba(242,244,249,1)",
              },
            }}
          />
          <Button
            style={{ margin: "20px 0px", width: "100%" }}
            type="submit"
            variant="filled"
            color="red"
          >
            Save
          </Button>
        </form>
      </Drawer>
      <CustomTitleWithEdit
        title={"About Me"}
        editIconClick={() => setEditMode(true)}
      />
      <AboutMeContainer>
        <AboutMeText>
          {aboutMe.length > 0 ? (
            aboutMe
          ) : (
            <NoAboutMe>No About added yet</NoAboutMe>
          )}
        </AboutMeText>
      </AboutMeContainer>

      <Divider size="sm" />
      <BloodGroupContainer>
        <BloodGroup>
          <Title size={"h6"}>Blood Group</Title>
          {bloodGroup && <div>{bloodGroup}</div>}
        </BloodGroup>
      </BloodGroupContainer>
      {cv ? (
        <a href={cv} target="_blank">
          <ResumeContainer>
            <ResumeLabelAndIconWrapper>
              <CVIcon width={"25px"} height={"25px"} />
              Resume
            </ResumeLabelAndIconWrapper>
            <div>
              <RightArrow width={"25px"} height={"25px"} />
            </div>
          </ResumeContainer>
        </a>
      ) : (
        <>
          <ResumeContainer onClick={() => console.log("No CV added yet")}>
            <ResumeLabelAndIconWrapper>
              <CVIcon width={"25px"} height={"25px"} />
              Resume
            </ResumeLabelAndIconWrapper>
            <div>
              <RightArrow width={"25px"} height={"25px"} />
            </div>
          </ResumeContainer>
        </>
      )}
      <Divider size="sm" />
    </PartAContainer>
  );
}

export default PartA;
