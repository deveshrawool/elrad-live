import styled from "@emotion/styled";
import { Divider, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  getEthicalCodeRatings,
  getVirtuallyMetRatings,
} from "services/getApis";
import UserList from "./UserList";
import { ReactComponent as Star } from "../../assets/svgs/star.svg";

const PartCContainer = styled.div`
  display: block;
  width: 360px;
  height: 300px;
  margin: 20px 20px 0 0;
  position: fixed;
  top: 75%;
  background-color: #999999;
`;

const RatingsContainer = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 17px;
  margin-bottom: 10px;
  background-color: #75767a;
  height: 44%;
  border-radius: 10px;
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: #d5d7d8;
`;
const RatingsWrapper = styled(Stack)`
  padding: 0 10px;
`;
const EachRating = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
`;
const CountAndDescription = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
`;

const StarWrapper = styled.div`
  position: fixed;
  height: 50px;
  width: 50px;
  top: 75%;
  left: 40%;
  border-radius: 100px;
  background-color: #75767a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function PartC() {
  const [ethicalCodeCount, setEthicalCodeCount] = useState();
  const [virtuallyMetCount, setVirtuallyMetCount] = useState();
  const [ethicalCodeUsers, setEthicalCodeUsers] = useState([]);
  const [virtuallyMetUsers, setVirtuallyMetUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [titleText, setTitleText] = useState("");
  const [countToPass, setCountToPass] = useState(0);
  useEffect(() => {
    getEthicalCodeRatings()
      .then((res) => {
        console.log(res);
        setEthicalCodeCount(res.ethicalCodeCount);
        setEthicalCodeUsers(res.result);
      })
      .catch((error) => console.log(error));
    getVirtuallyMetRatings()
      .then((res) => {
        setVirtuallyMetCount(res.virtuallyMetCount);
        setVirtuallyMetUsers(res.result);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleCountClick = (type) => {
    switch (type) {
      case "ethically": {
        setCountToPass(ethicalCodeCount);
        setTitleText("say has ethical code of conduct...");
        setUsersToDisplay(ethicalCodeUsers);
        setShowUsers(true);
        break;
      }
      case "virtually": {
        setCountToPass(virtuallyMetCount);
        setTitleText("have met in real life/video call");
        setUsersToDisplay(virtuallyMetUsers);
        setShowUsers(true);
        break;
      }
    }
  };
  const handleListClose = () => {
    setShowUsers(false);
    setCountToPass(0);
    setTitleText("");
    setUsersToDisplay([]);
  };
  return (
    <>
      <UserList
        opened={showUsers}
        onClose={() => handleListClose()}
        count={countToPass}
        titleText={titleText}
        users={usersToDisplay}
      />
      <PartCContainer>
        <StarWrapper>
          <Star width={"45px"} height={"45px"} />
        </StarWrapper>
        <RatingsContainer>
          Ratings
          <RatingsWrapper>
            <EachRating>
              <CountAndDescription
                onClick={() => handleCountClick("ethically")}
              >
                {ethicalCodeCount}
              </CountAndDescription>
              <CountAndDescription>
                Say has ethical code of conduct and is safe to do business with
              </CountAndDescription>
            </EachRating>
            <Divider size={"sm"} />
            <EachRating>
              <CountAndDescription
                onClick={() => handleCountClick("virtually")}
              >
                {virtuallyMetCount}
              </CountAndDescription>
              <CountAndDescription>
                Have met in real life / video call
              </CountAndDescription>
            </EachRating>
          </RatingsWrapper>
        </RatingsContainer>
      </PartCContainer>
    </>
  );
}

export default PartC;
