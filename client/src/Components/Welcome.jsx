import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  font-family: "Work sans";
  font-weight: bolder;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 30rem;
  }
`;

export default Welcome;
