import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../Extras/APIroutes";
import Contacts from "../Components/Contacts";
import Welcome from "../Components/Welcome";
import ChatBoxContainer from "../Components/ChatBoxContainer";

const Chat = () => {
  const navigate = useNavigate(); //to navigate

  //useStates
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [userLoaded, setUserLoaded] = useState(false);

  //useEffect
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("userInfo")) {
        navigate("/login");
      } else {
        //get userInfo from local storage
        setCurrentUser(await JSON.parse(localStorage.getItem("userInfo")));
        setUserLoaded(true);
      }
    })();
  }, []);

  //whenever the current User is set we call the Api from Api Routes that takes from User Routes
  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    })();
  }, [currentUser]);

  //Functions
  const handlechatChange = (chat) => {
    //if chat is present then
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handlechatChange}
          />
          {/* Conditionally rendering */}
          {userLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatBoxContainer currentChat={currentChat} />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  opacity: 0.95;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    //TABLET
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    //small screen
    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
