import React from "react";
import { Text } from "@chakra-ui/react";
import styled from "styled-components";
import { Logout } from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

const ChatBoxContainer = ({ currentChat }) => {
  //Functions
  const handleSendMessage = async (msg) => {};

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="Avatar"
                />
              </div>
              <div className="username">
                <Text
                  fontSize="lg"
                  fontFamily="'Raleway', sans-serif"
                  color={"white"}>
                  {currentChat.username}
                </Text>
              </div>
            </div>
            <Logout />
          </div>
          <Messages />
          <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 4rem;
        }
      }
      .username {
        h3 {
          color: white;
          font-family: "Work sans";
        }
      }
    }
  }
`;

export default ChatBoxContainer;
