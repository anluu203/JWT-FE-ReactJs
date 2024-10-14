import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from "./pages/loginPage";
import { SignUpPage } from './component/signUp_login/signUpPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/SignUp" element={<SignUpPage/>}></Route>
        </Routes>
        <ToastContainer
        position="top-right"
        autoClose={3000}
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
    </BrowserRouter>
  );
}

export default App;
