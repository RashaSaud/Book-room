import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: (userCredentials: any) => Promise<void>;
  logoutUser: () => void;
}

import { baseUrl } from "../core/static/static";
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const loginUser = async (userCredentials: any) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, userCredentials);
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate("/operation");
      }
    } catch (error) {
      //
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
