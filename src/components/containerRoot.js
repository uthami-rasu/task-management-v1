// import React, { Suspense, lazy ,useEffect} from "react";
// import styled from "styled-components";
// import { Routes, Route } from "react-router-dom";

// import NavBar from "./navbar";
// import Header from "./header";
// import { useUserContext } from "../context/usercontext";
// import Register from "../register/register";
// import VerifyEmail from "../register/verify_email";
// import Login from "../register/login";

// import {LoadingProfile} from "./utils";


// export const ContainerStyle = styled.div`
//   height: 99vh;
//   display: grid;
//   grid-template-areas:
//     "header header header"
//     "nav main profile";
//   grid-template-columns: 40px 9fr 2fr;
//   grid-template-rows: 50px 1fr;
//   gap: 0.5rem;
// `;

// // Lazy-loaded components
// const MainContent = lazy(() => import("./mainContent"));
// const DynamicMainContent = lazy(() => import("../pages/Pending"));
// const Profile = lazy(() => import("./profile"));

// export default function Container() {
//   let { loginStatus,setLoading,setUserName,navigate } = useUserContext();


//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(BASE_URL + "/auth/me", {
//           method: "GET",
//           credentials: "include",
//         });

//         if(!res.ok){
//           if (window.location.pathname !== "/auth/login") {
//             navigate("/auth/login"); // ✅ Avoid unnecessary navigation
//           } 
    
//         }
//         const data = await res.json();
//         setUserName(data?.user?.email || "Nope");
//           setLoginStatus(true);
//           if (window.location.pathname !== "/home") {
//             navigate("/home"); // ✅ Avoid unnecessary navigation
//           }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!loginStatus) {
//       fetchUser();
//     }
//   }, []);

//   return (
//     <ContainerStyle>
//       <Header />
//       <NavBar />

//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/auth/register" element={<Register />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />

//         {/* Lazy-loaded components wrapped in Suspense */}
//         <Route
//           path="/home"
//           element={
//             <Suspense fallback={<LoadingProfile/>}>
//               <MainContent />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/completed"
//           element={
//             <Suspense fallback={<p>Loading...</p>}>
//               <DynamicMainContent cType="Completed" />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/pending"
//           element={
//             <Suspense fallback={<p>Loading...</p>}>
//               <DynamicMainContent cType="Pending" />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/starred"
//           element={
//             <Suspense fallback={<p>Loading...</p>}>
//               <DynamicMainContent cType="Favorite" />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/overdue"
//           element={
//             <Suspense fallback={<p>Loading...</p>}>
//               <DynamicMainContent cType="Overdue" />
//             </Suspense>
//           }
//         />
//       </Routes>

//       {/* Lazy-load Profile if loginStatus is true */}
//       {loginStatus ? (
//         <Suspense fallback={<LoadingProfile/>}>
//           <Profile />
//         </Suspense>
//       ) : (
//         <LoadingProfile/>
//       )}
//     </ContainerStyle>
//   );
// }


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
`;

// Lazy-loaded components
const MainContent = lazy(() => import("./mainContent"));
const DynamicMainContent = lazy(() => import("../pages/Pending"));
const Profile = lazy(() => import("./profile"));

export default function Container() {
  const navigate = useNavigate(); // ✅ Correctly calling useNavigate()
  const { location,isLoginFormVisible,loginStatus, setLoginStatus, setLoading, setUserName,BASE_URL ,setIsLoginFormVisible} = useUserContext();

  useEffect(() => {

    if(["/auth/register","/auth/login","/verify-email"].includes(window.location.pathname)){
  
      // navigate(window.location.pathname);
      return;
    }
    const fetchUser = async () => {
      console.log(isLoginFormVisible);
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
          if (window.location.pathname !== "/auth/login" ) {
            navigate("/auth/login");
          }
          
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!loginStatus) {
      fetchUser();
    }
  }, [loginStatus,navigate,location.pathname]); // ✅ Corrected dependencies

  return (
    <ContainerStyle>
      <Header />
      <NavBar />

      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Lazy-loaded components wrapped in Suspense */}
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingProfile />}>
              <MainContent />
            </Suspense>
          }
        />
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
          <Profile />
        </Suspense>
      )}
    </ContainerStyle>
  );
}
