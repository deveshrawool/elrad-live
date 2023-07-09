import styled from "@emotion/styled";
import {
  Button,
  Divider,
  Drawer,
  MultiSelect,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import {
  getHobbies,
  getProfessionalSkills,
  getSubjects,
} from "services/getApis";
import CustomTitleWithEdit from "ui/CustomTitleWithEdit";
import SelectedDataDisplay from "./SelectedDataDisplay";

const PartBContainer = styled.div`
  display: block;
  width: 100%;
  height: fit-content;
  margin: 20px 0;
`;

const NoSkillsFound = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  color: "#808080";
`;

const MarginWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
`;

function PartB() {
  const [allSkills, setAllSkils] = useState([]);
  const [allHobbies, setAllHobbies] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const transformSkillsPayload = (data) => {
    return data.map((each) => {
      return {
        ...each,
        label: each.value,
      };
    });
  };
  useEffect(() => {
    getProfessionalSkills()
      .then((res) => {
        let result = transformSkillsPayload(res.result[0].skills);
        setAllSkils(result);
      })
      .catch((error) => console.log(error));
    getHobbies()
      .then((res) => {
        let result = transformSkillsPayload(res.result[0].hobbies);
        setAllHobbies(result);
      })
      .catch((error) => console.log(error));
    getSubjects()
      .then((res) => {
        console.log("sub", res.result[0]);
        let result = transformSkillsPayload(res.result[0].subjects);
        setAllSubjects(result);
      })
      .catch((error) => console.log(error));
  }, []);
  const form = useForm({
    initialValues: {
      skills: [],
      hobbies: [],
      subjects: [],
    },
    validate: {
      skills: (value) => (value.length > 0 ? null : "Please select Skills"),
      hobbies: (value) => (value.length > 0 ? null : "Please select Hobbies"),
      subjects: (value) => (value.length > 0 ? null : "Please select Subjects"),
    },
  });
  const handleSubmit = (values) => {
    setSelectedSkills(values.skills);
    setSelectedHobbies(values.hobbies);
    setSelectedSubjects(values.subjects);
    setEditMode(false);
  };
  return (
    <PartBContainer>
      <Drawer
        opened={editMode}
        onClose={() => setEditMode(false)}
        position="right"
        size={"lg"}
        withCloseButton={false}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Title
            size={"h6"}
            onClick={() => setEditMode(false)}
          >{`<   Skills`}</Title>
          <MarginWrapper>
            <MultiSelect
              data={allSkills}
              label="Your professional sills"
              placeholder="Pick skills"
              searchable
              nothingFound="Nothing found"
              onChange={(values) => console.log(values)}
              {...form.getInputProps("skills")}
              styles={{
                value: {
                  backgroundColor: "rgba(0, 0, 255, 0.5)",
                  color: "#fff",
                  borderRadius: "10px",
                },
              }}
            />
          </MarginWrapper>
          <MarginWrapper>
            <MultiSelect
              data={allHobbies}
              label="Your hobbies"
              placeholder="Pick hobbies"
              searchable
              nothingFound="Nothing found"
              {...form.getInputProps("hobbies")}
              styles={{
                value: {
                  backgroundColor: "rgba(0, 0, 255, 0.5)",
                  color: "#fff",
                  borderRadius: "10px",
                },
              }}
            />
          </MarginWrapper>
          <MarginWrapper>
            <MultiSelect
              data={allSubjects}
              label="Your favorite subjects"
              placeholder="Pick subjects"
              searchable
              nothingFound="Nothing found"
              {...form.getInputProps("subjects")}
              styles={{
                value: {
                  backgroundColor: "rgba(0, 0, 255, 0.5)",
                  color: "#fff",
                  borderRadius: "10px",
                },
              }}
            />
          </MarginWrapper>
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
        title={"Skills"}
        editIconClick={() => setEditMode(true)}
      />
      {selectedSkills.length > 0 ||
      selectedHobbies.length > 0 ||
      selectedSubjects.length > 0 ? (
        <>
          {selectedSkills.length > 0 && (
            <MarginWrapper>
              <Title size={"h6"}>I am incredible at this skills</Title>
              <SelectedDataDisplay data={selectedSkills} />
            </MarginWrapper>
          )}
          <Divider size="sm" />
          {selectedHobbies.length > 0 && (
            <MarginWrapper>
              <Title size={"h6"}>Hobbies I am passionate about</Title>
              <SelectedDataDisplay data={selectedHobbies} />
            </MarginWrapper>
          )}
          <Divider size="sm" />
          {selectedSubjects.length > 0 && (
            <MarginWrapper>
              <Title size={"h6"}>My favorite subjects are</Title>
              <SelectedDataDisplay data={selectedSubjects} />
            </MarginWrapper>
          )}
        </>
      ) : (
        <>
          <NoSkillsFound>
            <Text color="#808080">No Skills found</Text>
          </NoSkillsFound>
          <Divider size="sm" />
        </>
      )}
    </PartBContainer>
  );
}

export default PartB;
