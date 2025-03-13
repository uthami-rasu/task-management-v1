import "./styles/header.css";
import logo from "../assets/logo.png";
import { ButtonStyle } from "./StyledComponents/UtilsStyles";
import useTasks from "../context/usertasks";
import { useUserContext } from "../context/usercontext";
import { Menu, SquarePlus } from "lucide-react";
import { HeaderStyle } from "./StyledComponents/HeaderStyles";
import useTaskDetails from "../Hooks/useTaskDetails";
// core developement
export default function Header() {
  let { isFormVisible, setIsFormVisible } = useTasks();

  const [activeTasks] = useTaskDetails();

  let { loginStatus, userName, navigate, toggleMenu, setToggleMenu, location } =
    useUserContext();

  const handleHeaderBtn = () => {
    console.log(location.pathname);
    if (!loginStatus && location.pathname === "/auth/register") {
      navigate("/auth/login");
      return;
    }
    if (!loginStatus && location.pathname === "/auth/login") {
      navigate("/auth/register");
      return;
    }
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
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8oBzeQTfCoIkhE3nRJkQJf8XETaQ7-ujhA&s"
          }
          alt="logo"
        />
      </div>
      <div className="greet-middle">
        <div className="name-task">
          <h2>TasksEase</h2>
          {loginStatus && (
            <span>
              you have <b style={{ color: "green" }}>{activeTasks}</b> active
              tasks
            </span>
          )}
          {!loginStatus && <span>login or register to view your tasks</span>}
        </div>

        {loginStatus && (
          <button className="no-btn-style" onClick={handleHeaderBtn}>
            <SquarePlus />
          </button>
        )}
        {loginStatus && (
          <button className="no-btn-style" onClick={handleToggleMenu}>
            <Menu />
          </button>
        )}

        <ButtonStyle onClick={handleHeaderBtn}>
          {loginStatus && "Add Task"}
          {!loginStatus && location.pathname === "/auth/register" && "Login"}
          {!loginStatus && location.pathname === "/auth/login" && "Register"}
        </ButtonStyle>
      </div>
    </HeaderStyle>
  );
}
