import { useState } from "react";
import { React, createContext, useContext } from "react";

import { useSearchParams ,useNavigate,useLocation} from "react-router-dom";
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const [loading, setLoading] = useState(false);

  const [clientToken, setClientToken] = useState("");

  const [userName,setUserName] = useState("Buddy");

  const navigate = useNavigate();

  const BASE_URL = "https://backend-fastapi-3qe5.onrender.com";

  const location = useLocation();

  const toggleStatus = () => {
    setLoginStatus(!loginStatus);
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <UserContext.Provider
      value={{
        userName,setUserName,
        loginStatus,
        setLoginStatus,
        isLoginFormVisible,
        setIsLoginFormVisible,
        toggleStatus,
        loading,
        setLoading,
        clientToken,
        setClientToken,
        navigate,BASE_URL,location
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
