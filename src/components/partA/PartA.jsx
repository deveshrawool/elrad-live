import styled from "@emotion/styled";
import {
  Button,
  Divider,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import Edit from "../../assets/svgs/edit.svg";
import CustomTitleWithEdit from "ui/CustomTitleWithEdit";
import { useForm } from "@mantine/form";

const BloodGroup = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1 rem;
`;
const PartAContainer = styled.div`
  display: block;
  width: 100%;
  height: 300px;
`;

const AboutMeContainer = styled.div`
  width: 100%;
  min-height: 50px;
`;
const BloodGroupContainer = styled.div`
  width: 100%;
  min-height: 30px;
  margin: 10px 0;
`;
const AboutMeText = styled.p`
  font-size: 0.8rem;
  color: #6e6e6e;
`;
function PartA() {
  const [aboutMe, setAboutMe] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [cv, setCV] = useState();
  const [editMode, setEditMode] = useState(false);

  const form = useForm({
    initialValues: { aboutMe: "", bloodGroup: "", cv: null },
    validate: {
      aboutMe: (value) =>
        value.length > 3 && value.length < 500
          ? null
          : "Please enter characters between 3 and 500",
      bloodGroup: (value) =>
        value.length ? null : "please select blood group",
    },
  });
  function handleSubmit(values) {
    setAboutMe(values.aboutMe);
    setBloodGroup(values.bloodGroup);
    setEditMode(false);
  }
  return (
    <PartAContainer>
      {editMode ? (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Title
            size={"h6"}
            onClick={() => setEditMode(false)}
          >{`<   Bio`}</Title>
          <TextInput
            label="Write Something about yourself"
            placeholder="Write something here"
            {...form.getInputProps("aboutMe")}
          />
          <Select
            label="Blood Group"
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
      ) : (
        <>
          <CustomTitleWithEdit
            title={"About Me"}
            editIconClick={() => setEditMode(true)}
          />
          <AboutMeContainer>
            <AboutMeText>
              {aboutMe.length > 0 ? aboutMe : "No About added yet"}
            </AboutMeText>
          </AboutMeContainer>

          <Divider size="sm" />
          <BloodGroupContainer>
            <BloodGroup>
              <Title size={"h6"}>Blood Group</Title>
              {bloodGroup && <div>{bloodGroup}</div>}
            </BloodGroup>
          </BloodGroupContainer>
          <Divider size="sm" />
          <div>Resume</div>
        </>
      )}
    </PartAContainer>
  );
}

export default PartA;
