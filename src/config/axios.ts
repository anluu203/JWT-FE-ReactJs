import axios from "axios";
import { toast } from "react-toastify";

window.onerror = (message, source, lineno, colno, error) => {
    console.error("Runtime Error:", message, error);
    return true; // Ngăn popup lỗi
  };
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // Đảm bảo cookie được gửi cùng request
  });
  
// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let err = error.response.data;
    toast.error(err.EM)
    return Promise.reject(error);
  });

  export default instance;