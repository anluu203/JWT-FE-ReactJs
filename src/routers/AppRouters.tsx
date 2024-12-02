// src/router.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { SignUpPage } from "@/pages/signUpPage";
import LoginPage from "@/pages/loginPage";
import { HomePage } from "@/pages/home";
import Navbar from "@/component/navigation/navbar";
import PrivateRouters from "./PrivateRouters";
import { AppContext } from "@/hooks/useContext";

const AppRouter: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) {
    return <div>Error: AppContext is not available!</div>;
  }
  const { user } = context;
  return (
    
    <Router>
      {
        user  && user.isAuthenticated && <Navbar />
      }
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRouters component={HomePage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
