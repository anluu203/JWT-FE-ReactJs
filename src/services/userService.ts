import { User } from "@/component/handleUsersList/usersList/usersList"
import axios from '@/config/axios'
const handleRegister =  (
    email:string | number,
    phone:number | string,
    username:string | number,
    password: string | number ) =>{
     return axios.post('/api/v1/register', {
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
     return axios.post('/api/v1/login', {
        valueLogin,
        valuePassword
     })
}

const handleLogout = () =>{
    return axios.post('/api/v1/logout')
}

const handleFetchUsers = (page:number, results:number) => {
    return axios.get(`/api/v1/user/getAllUser?page=${page}&results=${results}`)
};


const handleDeleteUser = (user:User | null) => {
    if (user) {
        return axios.delete('/api/v1/user/delete', { data: { id: user.id } });
      }
      return Promise.reject(new Error("User is null")); // Or handle null case as needed
}

const fetchPosition = () => {
    return axios.get('/api/v1/position/read')
}

const handleCreateUser = (
    email:string | number,
    phone:number | string,
    username:string | number,
    password: string | number,
    address: string | number,
    sex: string,
    positionID: number| string) =>{
     return axios.post('/api/v1/user/create', {
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
        return axios.put('/api/v1/user/update', {
                     id,
                     username,
                     address,
                     sex,
                     positionID
               
             });
}

const getUserAccount = () =>{
    return axios.get('/api/v1/account')
}

export {handleRegister, handleLoginPage, handleFetchUsers,
        handleDeleteUser, fetchPosition, handleCreateUser,
        handleUpdateUser, getUserAccount, handleLogout
    }