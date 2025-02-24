import { useState } from "react";
import { React, createContext, useContext } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const [loading, setLoading] = useState(false);

  const toggleStatus = () => {
    setLoginStatus(!loginStatus);
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        isLoginFormVisible,
        setIsLoginFormVisible,
        toggleStatus,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
