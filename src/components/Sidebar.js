import { NavLink } from "react-router-dom";
import {
  Home,
  CheckCircle,
  Clock,
  Hourglass,
  Star,
  AlertCircle,
  X as Close,
  ChartNoAxesCombined,
} from "lucide-react";
import { ProfileSignOut } from "./StyledComponents/ProfileStyles";
import { useUserContext } from "../context/usercontext";
import { useEffect } from "react";
import { NavbarStyle } from "./StyledComponents/NavbarStyles";

const NavItem = ({ children, className, linkTo, dataLabel }) => {
  return (
    <li className={"nav-li " + className}>
      <NavLink to={linkTo} data-label={dataLabel}>
        {children}
      </NavLink>
    </li>
  );
};
export default function NavBar() {
  let {
    toggleMenu,
    setToggleMenu,
    location,
    deleteCookies: logout,
    loginStatus,
  } = useUserContext();

  useEffect(() => {
    setToggleMenu(false);
  }, [location.pathname]);

  if (!loginStatus) {
    return;
  }
  return (
    <>
      <NavbarStyle right={toggleMenu ? 0 : 1}>
        <li className="nav-li mobile-nav-li">
          <button
            className="no-btn-style"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <Close />
          </button>
        </li>
        <NavItem linkTo={"/"} dataLabel={"Home"}>
          <Home size={20} stroke="black" className="home-icon" />
        </NavItem>

        <NavItem linkTo={"/completed"} dataLabel={"Completed"}>
          <CheckCircle size={20} color="black" className="completed-icon" />
        </NavItem>

        <NavItem linkTo={"/pending"} dataLabel={"Pending"}>
          <Clock size={20} color="black" className="pending-icon" />
        </NavItem>

        <NavItem linkTo={"/starred"} dataLabel={"Favourite"}>
          <Star size={20} color="black" className="starred-icon" />
        </NavItem>

        <NavItem linkTo={"/overdue"} dataLabel={"Overdue"}>
          <AlertCircle size={20} color="black" className="overdue-icon" />
        </NavItem>
        <NavItem
          className={"analytics"}
          linkTo={"/analytics"}
          dataLabel={"Analytics"}
        >
          <ChartNoAxesCombined
            size={20}
            storke={"#000"}
            color="black"
            className="analytics-icon"
          />
        </NavItem>

        <li className="nav-li  mobile-nav-li mobile-logout">
          <ProfileSignOut onClick={logout} className="mobile-pc">
            Logout
          </ProfileSignOut>
        </li>
      </NavbarStyle>
    </>
  );
}
