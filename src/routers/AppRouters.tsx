// src/router.tsx

import React from "react";
import { useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import _ from "lodash";
import { SignUpPage } from "@/pages/signUpPage";
import LoginPage from "@/pages/loginPage";
import { HomePage } from "@/pages/home";
import Navbar from "@/component/navigation/navbar";
import { AccountContext } from "@/App";
import PrivateRouters from "./PrivateRouters";


const AppRouter: React.FC = () => {
  const accountContext = useContext(AccountContext);
  if (!accountContext) return null;
  const { account } = accountContext;
  return (
    
    <Router>
      {
        account && !_.isEmpty(account) && account.isAuthenticated && <Navbar />
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
