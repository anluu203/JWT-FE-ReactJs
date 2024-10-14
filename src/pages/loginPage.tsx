import { useEffect } from "react";
import axios from "axios";
import LeftLoginPage from "../component/signUp_login/leftLoginPage";
import RightLoginPage from "../component/signUp_login/rightLoginPage";
function LoginPage() {
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/test-api')
        .then(res => {
            console.log('check data: ',res.data)
        })
    },[])
    return(
        <div>
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg 
                flex justify-center flex-1">
                    <LeftLoginPage/>
                    <RightLoginPage/>
                </div>
            </div>
        </div>  
    )
}

export default LoginPage;