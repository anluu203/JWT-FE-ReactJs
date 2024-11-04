// src/router.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { SignUpPage } from "@/pages/signUpPage";
import LoginPage from "@/pages/loginPage";
import { HomePage } from "@/pages/home";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
