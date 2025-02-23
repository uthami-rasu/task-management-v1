import "./styles.css";

import Container from "./components/containerRoot";

import { TaskProvider } from "./components/utils";

import { BrowserRouter as Router } from "react-router-dom";

export default function TaskManager() {
  return (
    <>
      <Router>
        <TaskProvider>
          <Container></Container>
        </TaskProvider>
      </Router>
    </>
  );
}
