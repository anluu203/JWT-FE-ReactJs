import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getUserAccount } from "@/services/userService";
// Định nghĩa kiểu dữ liệu cho user
interface User {
    isAuthenticated: boolean,
    token: string | number,
    account: {}
    isLoading: boolean
}

// Định nghĩa kiểu dữ liệu cho context
interface AppContextProps {
  user: User;
  loginContext: (userData: User) => void;
  logout: () => void;
}

// Khởi tạo context với giá trị mặc định
const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  let defaultValueUser =     { 
    isAuthenticated: false,
    token: "",
    account:{},
    isLoading: true
  }

  const [user, setUser] = useState<User>(defaultValueUser);

  const loginContext = (userData: User) => {
    setUser({...userData, isLoading:false});
  };

  const logout = () => {
    setUser({...defaultValueUser, isLoading:false});
  };
  const fetchUser = async () =>{
   let response = await getUserAccount()
   let user = response.data;

   if (user && user.EC === 0) {
    let positionWithRoles = user.DT.positionWithRoles;
    let email = user.DT.email;
    let username = user.DT.username;
    let token = user.DT.access_token;
    let data = {
      isAuthenticated: true,
      token: token,
      account: {positionWithRoles, email, username},
      isLoading: false
    };
    setTimeout(() =>{
      setUser(data)
    },700)
   } else{
    setUser({...defaultValueUser, isLoading:false})
   }
  }
  useEffect(() =>{
      fetchUser();
      
  },[])

  return (
    <AppContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export  {AppProvider, AppContext};
