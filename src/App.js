import "./styles.css";

import Container from "./components/containerRoot";

import { TaskProvider } from "./components/utils";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./register/register";
import VerifyEmail from "./register/verify_email";
import { UserContextProvider } from "./context/usercontext";
export default function TaskManager() {
  return (
    <>
      <Router>
        <UserContextProvider>
          <TaskProvider>
            <Container></Container>
          </TaskProvider>
        </UserContextProvider>
      </Router>
    </>
  );
}
