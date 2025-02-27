// import HeaderStyle from "./styles/elements";

// style part
import { styled } from "styled-components";
import "./styles/header.css";
import logo from "../assets/logo.png";
import { ButtonStyle, SocialLogos, useTasks } from "./utils";
import { useUserContext } from "../context/usercontext";

const HeaderStyle = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 40px 1fr;
  column-gap: 0.7rem;

  @media (max-width: 550px) {
    background: red;
    .name-task h2 {
      font-size: 18px;
      margin-top: 3px;
    }
    .name-task span {
      font-size: 9px;
    }
  }
`;
// core developement
export default function Header() {
  let { isFormVisible, setIsFormVisible, activeTasks } = useTasks();

  let { loginStatus, userName, navigate } = useUserContext();

  const handleHeaderBtn = () => {
    if (loginStatus) {
      setIsFormVisible(true);
    } else {
      setIsFormVisible(false);
      navigate("/auth/login");
    }
  };
  return (
    <HeaderStyle>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="greet-middle">
        <div className="name-task">
          <h2>Welcome, {userName}!</h2>
          {loginStatus && (
            <span>
              you have <b style={{ color: "green" }}>{activeTasks}</b> active
              tasks
            </span>
          )}
          {!loginStatus && <span>login or register to view your tasks</span>}
        </div>
        <ButtonStyle onClick={handleHeaderBtn}>
          {loginStatus && "Add Task"}
          {!loginStatus && "Login"}
        </ButtonStyle>
      </div>
    </HeaderStyle>
  );
}
