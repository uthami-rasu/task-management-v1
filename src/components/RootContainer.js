import React, { Suspense, lazy, useEffect } from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";

import NavBar from "./Sidebar";
import Header from "./AppHeader";
import { useUserContext } from "../context/usercontext";
import Register from "../register/register";
import VerifyEmail from "../register/verify_email";
import Login from "../register/login";
import { ContainerStyle } from "./StyledComponents/RootContainerStyles";
import { LoadingProfile } from "../Utils/utils";

// Lazy-loaded components
import MainContent from "./TasksContainer";
const DynamicMainContent = lazy(() => import("../pages/DynamicTasksContainer"));
const Profile = lazy(() => import("./Analytics"));

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

  if (
    !loginStatus &&
    ["/auth/register", "/auth/login", "/verify-email"].includes(
      !window.location.pathname
    )
  ) {
    setIsLoginFormVisible(true);
    return;
  }

  // useEffect(() => {
  //   if (
  //     ["/auth/register", "/auth/login", "/verify-email"].includes(
  //       window.location.pathname
  //     )
  //   ) {
  //     return navigate(window.location.pathname);
  //   }
  //   if (localStorage.getItem("loginStatus")) {
  //     setLoginStatus(true);

  //     const storedUserName = localStorage.getItem("username");
  //     if (!userName || userName === "Buddy") {
  //       setUserName(storedUserName || "Guest"); // Fallback to "Guest" if username is null
  //     }

  //     return;
  //   }
  //   // const fetchUser = async () => {
  //   //   try {
  //   //     setLoading(true);
  //   //     const res = await fetch(BASE_URL + "/auth/me", {
  //   //       method: "GET",
  //   //       credentials: "include",
  //   //     });

  //   //     const data = await res.json();
  //   //     setUserName(data?.user || "Buddy");

  //   //     if (res.ok) {
  //   //       setLoginStatus(true);
  //   //       if (window.location.pathname !== "/") {
  //   //         navigate(window.location.pathname);
  //   //       }
  //   //     } else {
  //   //       setLoginStatus(false);
  //   //       setIsLoginFormVisible(true);
  //   //       if (window.location.pathname !== "/auth/login") {
  //   //         navigate("/auth/login");
  //   //       }
  //   //     }
  //   //   } catch (err) {
  //   //     console.error("Error fetching user:", err);
  //   //     setLoginStatus(false);
  //   //     setIsLoginFormVisible(true);
  //   //     if (window.location.pathname !== "/auth/login") {
  //   //       navigate("/auth/login");
  //   //     }
  //   //   } finally {
  //   //     setLoading(false);
  //   //   }
  //   // };

  //   // if (!localStorage.getItem("loginStatus")) {
  //   //   fetchUser(); //mobile
  //   // }
  // }, [loginStatus, navigate, location.pathname]);

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
