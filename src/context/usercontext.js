import { useState } from "react";
import { React, createContext, useContext } from "react";

import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [clientToken, setClientToken] = useState("");

  const [userName, setUserName] = useState("Buddy");

  const navigate = useNavigate();

  const BASE_URL = "https://backend-fastapi-3qe5.onrender.com";

  const location = useLocation();

  const toggleStatus = () => {
    setLoginStatus(!loginStatus);
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const [toggleMenu, setToggleMenu] = useState(false);

  const deleteCookies = async () => {
    const res = await fetch(BASE_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      const result = await res.json();

      alert(result.message);
    }
    setLoginStatus(false);
    navigate("/auth/login");
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        loginStatus,
        setLoginStatus,
        isLoginFormVisible,
        setIsLoginFormVisible,
        toggleStatus,
        loading,
        setLoading,
        clientToken,
        setClientToken,
        navigate,
        BASE_URL,
        location,
        toggleMenu,
        setToggleMenu,
        deleteCookies,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
