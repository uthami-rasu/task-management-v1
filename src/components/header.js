// import HeaderStyle from "./styles/elements";

// style part
import { styled } from "styled-components";
import "./styles/header.css";
import logo from "../assets/logo.png";
import { ButtonStyle, useTasks } from "./utils";
import { useUserContext } from "../context/usercontext";
import { Menu, SquarePlus } from "lucide-react";
const HeaderStyle = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 40px 1fr;
  column-gap: 0.7rem;
  @media (max-width: 550px) {
    height: 50px;
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

  let { loginStatus, userName, navigate, toggleMenu, setToggleMenu } =
    useUserContext();

  const handleHeaderBtn = () => {
    console.log(isFormVisible,'isfv');
    if (loginStatus) {
      setIsFormVisible(true);
    } else {
      setIsFormVisible(false);
      navigate("/auth/login");
    }
  };

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
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

        {loginStatus && (
          <button className="no-btn-style" onClick={handleHeaderBtn}>
            <SquarePlus />
          </button>
        )}
        {loginStatus && <button className="no-btn-style" onClick={handleToggleMenu}>
          <Menu />
        </button>}
      </div>
    </HeaderStyle>
  );
}
