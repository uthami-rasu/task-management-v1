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

import { ShimmerMainContent } from "./ShimmerUi";
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
            <Suspense fallback={<ShimmerMainContent />}>
              <DynamicMainContent cType="Completed" />
            </Suspense>
          }
        />
        <Route
          path="/pending"
          element={
            <Suspense fallback={<ShimmerMainContent />}>
              <DynamicMainContent cType="Pending" />
            </Suspense>
          }
        />

        <Route
          path="/starred"
          element={
            <Suspense fallback={<ShimmerMainContent />}>
              <DynamicMainContent cType="Favorite" />
            </Suspense>
          }
        />
        <Route
          path="/overdue"
          element={
            <Suspense fallback={<ShimmerMainContent />}>
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
