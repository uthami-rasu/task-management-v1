// import HeaderStyle from "./styles/elements";

// style part
import { styled } from "styled-components";
import "./styles/header.css";
import logo from "../assets/logo.png";
import { ButtonStyle, SocialLogos, useTasks } from "./utils";

const HeaderStyle = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 40px 9fr 2fr;
  column-gap: 0.7rem;
`;
// core developement
export default function Header() {
  let { isFormVisible, setIsFormVisible, activeTasks } = useTasks();
  return (
    <HeaderStyle>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="greet-middle">
        <div className="name-task">
          <h2>Welcome, Buddy!</h2>
          <span>
            you have <b style={{ color: "green" }}>{activeTasks}</b> active
            tasks
          </span>
        </div>
        <ButtonStyle onClick={() => setIsFormVisible(!isFormVisible)}>
          Add new Task
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
