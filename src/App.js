import "./styles.css";
import Container from "./components/containerRoot";
import { TaskProvider } from "./components/utils";

export default function TaskManager() {
  return (
    <>
   
        <TaskProvider>
          <Container></Container>
        </TaskProvider>
  
    </>
  );
}
