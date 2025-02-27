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

  @media (max-width: 480px) {
    position: absolute;
    top: 20px;
    left: -250px;
    width: 15rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background: red;
    height: 100%;
    padding: 10px;
    border-radius: 0.5rem;
    .nav-li {
      display: flex;
      align-items: center;
      gap: 0px; /* Space between icon and text */
      padding: 8px 0;
      width: 90%;
    }
    .nav-li a {
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
      font-size: 16px;
      text-decoration: none;
    }
    .nav-li a::after {
      content: attr(data-label); /* Dynamic text from attribute */
      display: inline-block;
      font-size: 17px;
      font-weight: 500;
      color: white;
      margin: auto;
    }
  }
`;

export default function NavBar() {
  return (
    <>
      <NavbarStyle>
        <li className="nav-li">
          <NavLink to="/" data-label="Home">
            <Home size={20} stroke="black" className="home-icon" />
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/completed" data-label="Completed">
            <CheckCircle size={20} color="black" className="completed-icon" />
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/pending" data-label="Pending">
            <Clock size={20} color="black" className="pending-icon" />
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/starred" data-label="Favorite">
            <Star size={20} color="black" className="starred-icon" />
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/overdue" data-label="Overdue">
            <AlertCircle size={20} color="black" className="overdue-icon" />
          </NavLink>
        </li>
      </NavbarStyle>
    </>
  );
}
