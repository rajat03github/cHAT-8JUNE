import React, { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { loginRoute } from "../../Extras/APIroutes";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast(); //ChakraToast
  const navigate = useNavigate();

  //states
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  //Show Password or Not
  const [show, setShow] = useState(false);
  const handlePassSeen = () => setShow(!show);

  //UseEffect - runs first time
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
    }
  }, []);

  //Functions

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      //if returns true , call the api , So calling the API
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        //login ROUTE is in APIRoutes to store in the Schema
        username,
        password,
      });
      //if the sent status is false that means user is not created
      if (data.status === false) {
        toast({
          title: data.msg,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      //if created then save it
      if (data.status === true) {
        localStorage.setItem("userInfo", JSON.stringify(data.user)); //string it
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;

    if (username.length === "") {
      toast({
        title: "Email and Password is Required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    } else if (password === "") {
      toast({
        title: "Email and Password is Required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      {/* <form onSubmit={(event) => handleSubmit(event)}> */}
      <VStack spacing="5px">
        {/* USERNAME */}
        <FormControl id="username" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="username"
            placeholder="Enter Your Name"
            onChange={(e) => handleChange(e)}
            min={3}
          />
        </FormControl>

        {/* password */}
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handlePassSeen}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          type="submit"
          width="100%"
          onClick={(event) => handleSubmit(event)}
          style={{ marginTop: 15 }}>
          Log in
        </Button>
        <HStack spacing="0" justify="center">
          <Text color="fg.muted">Don't have an account ?</Text>
          <Button variant="text" color="blue.500">
            <Link to="/register"> Sign Up </Link>
          </Button>
        </HStack>
      </VStack>
      {/* </form> */}
    </>
  );
};

export default Login;
