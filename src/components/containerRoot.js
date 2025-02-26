import styled from "styled-components";

import NavBar from "./navbar";
import Header from "./header";
import MainContent from "./mainContent";
import Profile from "./profile";
import { Routes, Route } from "react-router-dom";
import DynamicMainContent from "../pages/Pending";
import { useUserContext } from "../context/usercontext";
import Register from "../register/register";
import VerifyEmail from "../register/verify_email";
import Login from "../register/login";

export const ContainerStyle = styled.div`
  height: 99vh;
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main profile";
  grid-template-columns: 40px 9fr 2fr;
  grid-template-rows: 50px 1fr;
  gap: 0.5rem;
`;

export default function Container() {
  let { loginStatus } = useUserContext();
  return (
    <ContainerStyle>
      <Header></Header>
      <NavBar></NavBar>

      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/home" element={<MainContent />} />
        <Route
          path="/completed"
          element={<DynamicMainContent cType={"Completed"} />}
        />
        <Route
          path="/pending"
          element={<DynamicMainContent cType={"Pending"} />}
        />
        <Route
          path="/starred"
          element={<DynamicMainContent cType={"Favorite"} />}
        />
        <Route
          path="/overdue"
          element={<DynamicMainContent cType={"Overdue"} />}
        />
      </Routes>
      {loginStatus && <Profile></Profile>}
    </ContainerStyle>
  );
}
