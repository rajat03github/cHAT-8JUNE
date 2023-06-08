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
import { registerRoute } from "../../Extras/APIroutes";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const toast = useToast(); //ChakraToast
  const navigate = useNavigate();

  //states
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        //register ROUTE is in APIRoutes to store in the MongoDB
        username,
        email,
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      alert("npt same");
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    } else if (username.length < 3) {
      toast({
        title: "Username should be greater than 3 characters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    } else if (email === "") {
      toast({
        title: "Email is Required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
          />
        </FormControl>
        {/* email */}
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => handleChange(e)}
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
        {/* confirm password */}
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Confirm password"
              name="confirmPassword"
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
          Register
        </Button>
        <HStack spacing="0" justify="center">
          <Text color="fg.muted">Already have an account?</Text>
          <Button variant="text" color="blue.500">
            <Link to="/login"> Login </Link>
          </Button>
        </HStack>
      </VStack>
      {/* </form> */}
    </>
  );
};

export default Register;
