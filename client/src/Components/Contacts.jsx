import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { Text } from "@chakra-ui/react";

const Contacts = ({ contacts, currentUser }) => {
  //useStates
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined); //for selected on chat

  //UseEffect
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  //Functions
  const changeCurrentChat = (index, contact) => {};

  return (
    <>
      {/* Conditionally rendering Components */}
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            {/* <h3>Chat-Boom</h3> */}
            <Text fontSize="2xl" fontFamily="Work sans" color={"white"}>
              Chat-Boom
            </Text>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}>
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="Avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
            FOR SCROLLBAR
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}>
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="Avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          {/* CURRENT USER */}
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="Avatar"
              />
            </div>
            <div className="username">
              {/* <h2>{currentUserName}</h2> */}

              <Text
                fontSize="xl"
                fontFamily="'Raleway', sans-serif"
                color={"white"}>
                {currentUserName}
              </Text>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;

  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-family: "Work sans";
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    ::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out; //smooth transition
      .avatar {
        img {
          height: 3.8rem;
        }
      }
      .username {
        h3 {
          font-family: "Work sans";
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 6rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        font-family: "Work sans";
        color: white;
      }
    }
    //TABLET
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 and Text {
          font-size: 1rem;
        }
      }
    }
    //small screen
    @media screen and (min-width: 360px) and (max-width: 480px) {
      gap: 0.5rem;
      .username {
        h2 and Text {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
