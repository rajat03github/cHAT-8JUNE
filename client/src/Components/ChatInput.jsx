import React from "react";
import styled from "styled-components";

import { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const ChatInput = () => {
  //States
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); //For Emojis
  const [msg, setMsg] = useState(""); //For Messages

  return (
    <Container>
      <div className="buttonContainer"></div>
      <form className="inputContainer">
        <input
          type="text"
          placeholder="Message"
          value={msg}
          onChange={(event) => setMsg(event.target.value)}
        />
        <Button
          className="submit"
          colorScheme="twitter"
          borderRadius={"full"}
          variant={"ghost"}>
          <ArrowForwardIcon />
        </Button>
      </form>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  align-items: center;
  background-color: #080420;
  padding: 0.2rem;
  padding-bottom: 0.3rem;

  .buttonContainer {
    display: flex;
    align-items: center;
    color: white;
    gap: 0.2rem;
  }

  .inputContainer {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #88666634;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    .submit {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      svg {
        font-size: 1.15rem;
      }
    }
  }
`;

const CustomPicker = styled.div`
  position: absolute;
  top: -470px; // Adjust the value as per your requirement
`;

export default ChatInput;
