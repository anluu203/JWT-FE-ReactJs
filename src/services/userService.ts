import { UserDataProps } from "@/component/handleUsersList/dialogCreate"
import { User } from "@/component/handleUsersList/usersList/usersList"
import axios from "axios"
import { mapUserToUserDataProps } from "@/component/handleUsersList/dialogCreate"

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



const handleFetchUsers = (page:number, results:number) => {
    return axios.get(`http://localhost:8080/api/v1/user/getAllUser?page=${page}&results=${results}`)
};


const handleDeleteUser = (user:User | null) => {
    if (user) {
        return axios.delete('http://localhost:8080/api/v1/user/delete', { data: { id: user.id } });
      }
      return Promise.reject(new Error("User is null")); // Or handle null case as needed
}

const fetchPosition = () => {
    return axios.get('http://localhost:8080/api/v1//position/read')
}

const handleCreateUser = (
    email:string | number,
    phone:number | string,
    username:string | number,
    password: string | number,
    address: string | number,
    sex: string,
    positionID: number| string) =>{
     return axios.post('http://localhost:8080/api/v1/user/create', {
            email,
            phone,
            username,
            password,
            address,
            sex,
            positionID
        }
    )
}
const handleUpdateUser =( 
    id: string| number | undefined,
    username:string | number,
    address: string | number,
    sex: string,
    positionID:string| number
    ) =>{
        return axios.put('http://localhost:8080/api/v1/user/update', {
                     id,
                     username,
                     address,
                     sex,
                     positionID
               
             });
}



export {handleRegister, handleLoginPage, handleFetchUsers,
        handleDeleteUser, fetchPosition, handleCreateUser,
        handleUpdateUser
    }