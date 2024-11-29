import  {  useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import AppRouter from "./routers/AppRouters";
import { AppContext } from "./hooks/useContext";
function App() {
  const context = useContext(AppContext);
  const [showLoading, setShowLoading] = useState(true);
  if (!context) {
    return <div>Error: AppContext is not available!</div>;
  }
  const { user } = context;
  
  return (
    <>
      {user && user.isLoading ? 
      <div className="loading-container flex flex-col justify-center items-center h-screen">
        <Puff
           color= "#0078D4"
           ariaLabel="loading" 
        />
        <div className="mt-5 text-xl">Loading...</div>
      </div>
      :
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
      }

    </>
  );
}




export default App;
