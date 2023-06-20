import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

export const Logout = () => {
  const navigate = useNavigate();

  //function
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.9rem;
  padding: 0.5rem;
  background-color: #9a86f3;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
