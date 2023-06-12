import React, { useEffect, useState } from "react";
import loader from "../assets/loader.gif";
import styled from "styled-components";
import { setAvatarRoute } from "../Extras/APIroutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { Button, Text, useToast } from "@chakra-ui/react";
//npm install buffer for buffering avatar images

const SetAvatar = () => {
  const api = "https://api.dicebear.com/6.x/adventurer/svg?seed=Felix"; //MultiAvatar API
  const navigate = useNavigate();
  const toast = useToast(); //ChakraToast

  //Usestates
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //display loader while avatars are loading
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  //useEff
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("userInfo")) {
        navigate("/login");
      }
    })();
  }, []);

  //Functions
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast({
        title: "Please select an Avatar",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      const user = await JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      //GEtting from UserController
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("userInfo", JSON.stringify(user));
        navigate("/");
      }
    }
  };

  //useEffect
  useEffect(() => {
    (async () => {
      const data = [];
      //for in Loop for the api calling
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );

        //buffer is for avatars
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          {/* <h1>Pick an Avatar</h1> */}
          <Text fontSize="4xl" fontFamily="Work sans" color={"white"}>
            Pick an Avatar
          </Text>

          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}>
                  {/* this will read the base 64 string as an image */}
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="Avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <Button
            onClick={setProfilePicture}
            colorScheme="teal"
            variant="outline">
            Set as Profile Picture
          </Button>
        </Container>
      )}
    </>
  );
};

//Styled Container
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  opacity: 0.95;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      cursor: pointer;
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;

      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 9rem;
        width: fit-content;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
`;

export default SetAvatar;
