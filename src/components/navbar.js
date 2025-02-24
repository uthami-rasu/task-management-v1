import { styled } from "styled-components";

import { NavLink, Routes, Route } from "react-router-dom";
import {
  Home,
  CheckCircle,
  Clock,
  Hourglass,
  Star,
  AlertCircle,
} from "lucide-react";

import Test from "../pages/Pending";
export const NavbarStyle = styled.div`
  grid-area: nav;

  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  gap: 0.5rem;

  .nav-li a.active .home-icon {
    stroke: blue;
  } /* Green */
  .nav-li a.active .completed-icon {
    stroke: #22c55e;
  } /* Emerald */
  .nav-li a.active .pending-icon {
    stroke: #3b82f6;
  } /* Blue */
  .nav-li a.active .starred-icon {
    stroke: #f59e0b;
  } /* Amber */
  .nav-li a.active .overdue-icon {
    stroke: #ef4444;
  } /* Red */
`;

export default function NavBar() {
  return (
    <>
      <NavbarStyle>
        <li className="nav-li">
          <NavLink to="/home" end>
            <Home size={20} stroke="black" className="home-icon" />
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/completed" end>
            <CheckCircle size={20} color="black" className="completed-icon" />
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/pending">
            <Clock size={20} color="black" className="pending-icon" />
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/starred" end>
            <Star size={20} color="black" className="starred-icon" />
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/overdue" end>
            <AlertCircle size={20} color="black" className="overdue-icon" />
          </NavLink>
        </li>
      </NavbarStyle>
    </>
  );
}
