import React, { Suspense, lazy, useEffect } from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";

import NavBar from "./navbar";
import Header from "./header";
import { useUserContext } from "../context/usercontext";
import Register from "../register/register";
import VerifyEmail from "../register/verify_email";
import Login from "../register/login";

import { LoadingProfile } from "./utils";

export const ContainerStyle = styled.div`
  height: 99vh;
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main profile";
  grid-template-columns: 40px 9fr 2fr;
  grid-template-rows: 50px 1fr;
  gap: 0.5rem;

  @media (max-width: 550px) {
    position: relative;
    display: flex !important; //ch
    flex-direction: column;
    flex-wrap: no-wrap;
    gap: 0px;
  }
`;

// Lazy-loaded components
import MainContent from "./mainContent";
const DynamicMainContent = lazy(() => import("../pages/Pending"));
const Profile = lazy(() => import("./profile"));

export default function Container() {
  const {
    location,
    isLoginFormVisible,
    loginStatus,
    setLoginStatus,
    setLoading,
    setUserName,
    userName,
    BASE_URL,
    setIsLoginFormVisible,
    navigate,
  } = useUserContext();
  console.log("updated");
  if (
    !loginStatus &&
    ["/auth/register", "/auth/login", "/verify-email"].includes(
      !window.location.pathname
    )
  ) {
    console.log("updated.");
    return;
  }

  useEffect(() => {
    if (
      ["/auth/register", "/auth/login", "/verify-email"].includes(
        window.location.pathname
      )
    ) {
      return navigate(window.location.pathname);
    }
    if (localStorage.getItem("loginStatus")) {
      setLoginStatus(true);

      const storedUserName = localStorage.getItem("username");
      if (!userName || userName === "Buddy") {
        setUserName(storedUserName || "Guest"); // Fallback to "Guest" if username is null
      }

      return;
    }
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(BASE_URL + "/auth/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setUserName(data?.user || "Nope");

        if (res.ok) {
          setLoginStatus(true);
          if (window.location.pathname !== "/") {
            navigate(window.location.pathname);
          }
        } else {
          setLoginStatus(false);
          setIsLoginFormVisible(true);
          if (window.location.pathname !== "/auth/login") {
            navigate("/auth/login");
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setLoginStatus(false);
        setIsLoginFormVisible(true);
        if (window.location.pathname !== "/auth/login") {
          navigate("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!localStorage.getItem("loginStatus")) {
      fetchUser(); //mobile
    }
  }, [loginStatus, navigate, location.pathname]); // ✅ Corrected dependencies

  return (
    <ContainerStyle
      className={location.pathname === "/analytics" ? "analytics-active" : ""}
    >
      <Header />
      <NavBar />

      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Lazy-loaded components wrapped in Suspense */}
        <Route path="/" element={<MainContent />} />
        <Route
          path="/completed"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <DynamicMainContent cType="Completed" />
            </Suspense>
          }
        />
        <Route
          path="/pending"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <DynamicMainContent cType="Pending" />
            </Suspense>
          }
        />
        <Route
          path="/starred"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <DynamicMainContent cType="Favorite" />
            </Suspense>
          }
        />
        <Route
          path="/overdue"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <DynamicMainContent cType="Overdue" />
            </Suspense>
          }
        />
      </Routes>

      {/* Lazy-load Profile if loginStatus is true */}
      {loginStatus && (
        <Suspense fallback={<LoadingProfile />}>
          <Profile className="pc-profile" />
        </Suspense>
      )}
    </ContainerStyle>
  );
}
