import styled from "@emotion/styled";
import { Divider, Drawer, Stack, Text } from "@mantine/core";
import React from "react";

const Heading = styled.div`
  font-weight: 500;
  color: #808080;
  font-size: 1rem;
`;
const Count = styled.text`
  font-weight: 600;
  color: #000;
`;
const UserContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  align-items: center;
`;
export const Image = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  background-size: contain;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  border-radius: 80px;
  background-position-x: center;
  background-position-y: center;
`;

const NameAndTitleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;
const Name = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;
const UserTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: #808080;
`;
function UserList(props) {
  const { count, titleText, users } = props;
  const Title = () => {
    return (
      <Text truncate>
        <Count>{count}</Count> {titleText}
      </Text>
    );
  };
  return (
    <Drawer position="right" size={"lg"} title={<Title />} {...props}>
      {users.map((user, index) => {
        return (
          <>
            <UserContainer key={`${user.firstname + user.lastname + index}`}>
              <Image backgroundImage={user.dpURL} />
              <NameAndTitleWrapper>
                <Name>
                  {user.firstname} {user.lastname}
                </Name>
                <UserTitle>{user.title[0].value}</UserTitle>
              </NameAndTitleWrapper>
            </UserContainer>
            <Divider
              size={"0.1rem"}
              color="#D3D3D3"
              style={{ margin: "10px 0" }}
            />
          </>
        );
      })}
    </Drawer>
  );
}

export default UserList;
