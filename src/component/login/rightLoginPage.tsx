import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import InputReuseable from "../atoms/input/input";
import ButtonBase from "../atoms/button/button";
import { PRIMARY } from "@/helper/colors";
import { handleLoginPage } from "@/services/userService";
import { AppContext } from "@/hooks/useContext";
function RightLoginPage() {
    const navigate = useNavigate();
    const [valueLogin, setValueLogin] = useState("");
    const [valuePassword, setValuePassword] = useState("");
    
    const defaultValue = {
      isValidLogin: true,
      isValidPassWord: true,
    };
    
    const [checkValid, setCheckValid] = useState(defaultValue);
  
 
  
    const appContext = useContext(AppContext)
    if (!appContext) {
      return null
    }
    const {loginContext} = appContext
    const validateData = (): boolean => {
      setCheckValid(defaultValue);
      if (!valueLogin) {
        setCheckValid({ ...defaultValue, isValidLogin: false });
        return false;
      }
      if (!valuePassword) {
        setCheckValid({ ...defaultValue, isValidPassWord: false });
        return false;
      }
      return true;
    };
  
    const handleLogin = async () => {
      let check = validateData();
      let response = await handleLoginPage(valueLogin, valuePassword); // Gọi API đăng nhập
      let validate = response.data;
      if (check) {
        if (+validate.EC === 0) {
          toast.success(validate.EM); 
          let positionWithRoles = validate.DT.positionWithRoles;
          let email = validate.DT.email;
          let username = validate.DT.username;
          let token = validate.DT.access_token;
          const data = {
            isAuthenticated: true,
            token: token,
            account: {positionWithRoles, email, username},
            isLoading: false
          };
          localStorage.setItem('jwt', token)
          loginContext(data)
          navigate("/home"); // Điều hướng đến trang chủ
        } else {
          toast.error(validate.EM);
        }
      } else {
        toast.error(validate.EM);
      }
    };

  return (
    <div className="right lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-2xl xl:text-3xl font-extrabold">Đăng nhập</h1>
        <div className="w-full flex-1 mt-8">
          <div className="flex flex-col items-center">
            <button
              className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 
                                        text-gray-800 flex items-center justify-center transition-all duration-300 
                                        ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
            >
              <div className="bg-white p-2 rounded-full">
                <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 
                                                    63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 
                                                    26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 
                                                    243.2 149.9z"
                    fill="#34a853"
                  />
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 
                                                    167.5 0 244.4l90.4-70.1z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 
                                                    272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="#ea4335"
                  />
                </svg>
              </div>
              <span className="ml-4">Đăng nhập với Google</span>
            </button>

            <button
              className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 
                                        flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none 
                                        hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
            >
              <div className="bg-white p-1 rounded-full">
                <svg className="w-6" viewBox="0 0 32 32">
                  <path
                    fillRule="evenodd"
                    d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                  />
                </svg>
              </div>
              <span className="ml-4">Đăng nhập với GitHub</span>
            </button>
          </div>

          <div className="my-12 border-b text-center">
            <div
              className="leading-none px-2 inline-block text-sm text-gray-600 
                                        tracking-wide font-medium bg-white transform translate-y-1/2"
            >
              Hoặc đăng nhập với e-mail
            </div>
          </div>

          <div className="mx-auto max-w-xs">
            <form>
              <InputReuseable
                placeholder="Email or Phone number"
                type="text"
                value={valueLogin}
                onChange={(e) => setValueLogin(e.target.value)}
                name="email"
                className={`mt-5 ${
                  !checkValid.isValidPassWord || !checkValid.isValidLogin
                    ? `bg-red-100 border-red-200 
                                               placeholder-red-500 
                                               focus:border-red-400`
                    : ""
                }`}
              />
              <InputReuseable
                placeholder="Password"
                type="password"
                value={valuePassword}
                onChange={(e) => setValuePassword(e.target.value)}
                name="password"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
                className={`mt-5 ${
                  !checkValid.isValidPassWord || !checkValid.isValidLogin
                    ? `bg-red-100 border-red-200 
                                               placeholder-red-500 
                                               focus:border-red-400`
                    : ""
                }`}
              />
              <Box className="flex justify-center w-full mt-5">
                <ButtonBase
                  fontWeight="600"
                  onClick={() => handleLogin()}
                  theme="submit"
                  style={{
                    paddingTop: "1rem",
                    borderRadius: "0.5rem",
                    paddingBottom: "1rem",
                    width: "100%",
                  }}
                >
                  Đăng nhập
                </ButtonBase>
              </Box>
            </form>
            <p className=" mt-6 text-sm text-gray-600 text-center ">
              Bạn chưa có tài khoản?{" "}
              <Link to="/SignUp" style={{ color: PRIMARY.MEDIUM }}>
                Đăng ký
              </Link>{" "}
              tại đây
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightLoginPage;
