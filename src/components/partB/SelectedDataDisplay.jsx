import styled from "@emotion/styled";
import React from "react";

const DataListContainer = styled.div`
  display: block;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
`;
const DataContainer = styled.div`
  font-size: 0.876rem;
  display: inline-block;
  width: fit-content;
  height: fit-content;
  background-color: rgba(0, 0, 255, 0.5);
  border-radius: 10px;
  margin-right: 10px;
  padding: 5px;
`;
function SelectedDataDisplay({ data }) {
  return (
    <DataListContainer>
      {data.map((each) => {
        return <DataContainer>{each}</DataContainer>;
      })}
    </DataListContainer>
  );
}

export default SelectedDataDisplay;
