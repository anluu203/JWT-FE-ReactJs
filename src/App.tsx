import React, { createContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routers/router";

// Định nghĩa kiểu cho `account`
interface AccountType {
  isAuthenticated: boolean;
  token: string;
}

// Định nghĩa kiểu cho AccountContext
interface AccountContextType {
  account: AccountType;
  setAccount: React.Dispatch<React.SetStateAction<AccountType>>;
}
// khởi tạo {account, setAccount} cho toàn cục bằng useContext
export const AccountContext = createContext<AccountContextType | null>(null); 
function App() {
  const [account, setAccount] = useState<AccountType>({
    isAuthenticated: false,
    token: "",
  });

  useEffect(() => {
    const session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <div className="App">
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AccountContext.Provider>
  );
}

export default App;
