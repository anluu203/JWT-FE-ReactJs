import axios from "axios"
const handleRegister =  (
    email:string | number,
    phone:number | string,
    userName:string | number,
    password: string | number ) =>{
     return axios.post('http://localhost:8080/api/v1/register', {
            email,
            phone,
            userName,
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


export {handleRegister, handleLoginPage}