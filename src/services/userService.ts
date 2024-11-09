import axios from "axios"
const handleRegister =  (
    email:string | number,
    phone:number | string,
    username:string | number,
    password: string | number ) =>{
     return axios.post('http://localhost:8080/api/v1/register', {
            email,
            phone,
            username,
            password,
        }
    )
}

const handleLoginPage =  (
    valueLogin: any,
    valuePassword: any
) =>{
     return axios.post('http://localhost:8080/api/v1/login', {
        valueLogin,
        valuePassword
     })
}


// Define an interface for the user structure if known


const handleFetchUsers = () => {
    return axios.get('http://localhost:8080/api/v1/user/getAllUser')
};
export {handleRegister, handleLoginPage, handleFetchUsers}