import "./styles.css";
import Container from "./components/RootContainer";
import { TaskProvider } from "./context/usertasks";

export default function TaskManager() {
  return (
    <>
      <TaskProvider>
        <Container></Container>
      </TaskProvider>
    </>
  );
}
