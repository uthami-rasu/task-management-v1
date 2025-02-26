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
  grid-template-columns: 40px 9fr 2fr;
  column-gap: 0.7rem;
`;
// core developement
export default function Header() {
  let { isFormVisible, setIsFormVisible, activeTasks } = useTasks();

  let { loginStatus, userName } = useUserContext();

  const handleHeaderBtn = () => {
    if (loginStatus) {
      setIsFormVisible(!isFormVisible);
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
          {loginStatus && "Add new Task"}
          {!loginStatus && "Login / Register"}
        </ButtonStyle>
      </div>
      <div className="social">
        {SocialLogos.map((elem, idx) => {
          return <img src={logo} height={30} width={30} />;
        })}
      </div>
    </HeaderStyle>
  );
}
