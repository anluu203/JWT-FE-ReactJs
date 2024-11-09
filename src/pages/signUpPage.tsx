import { useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import { handleRegister } from "@/services/userService";
import { Box } from '@mui/material';
import LeftLoginPage from "../component/login/leftLoginPage";
import ButtonBase from "../component/atoms/button/button";
import { PRIMARY } from "@/helper/colors";
import InputReuseable from "../component/atoms/input/input";
export const SignUpPage = () => {
    var navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [confirm, setConfirm] = useState('')
    
    let defaultValue = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUserName: true,
        isValidPassWord: true,
        isValidConfirm: true
    }
    const [checkValid, setCheckValid] = useState(defaultValue)

    const validateData = ():boolean =>{

        setCheckValid(defaultValue)
        if (!email) {
            toast.error('Email is required !')
            setCheckValid({...defaultValue, isValidEmail:false})
            return false
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error('Please enter a valid email address')
            setCheckValid({...defaultValue, isValidEmail:false})
            return false
        }
        if (!phone) {
            toast.error('Phone number is required !')
            setCheckValid({...defaultValue, isValidPhone:false})
            return false
        }
        if (!userName) {
            toast.error('Username is required !')
            setCheckValid({...defaultValue, isValidUserName:false})
            return false
        }
        if (!password) {
            toast.error('Password is required !')
            setCheckValid({...defaultValue, isValidPassWord:false})
            return false
        }
        if (!confirm) {
            toast.error('Confirm password is required !')
            setCheckValid({...defaultValue, isValidConfirm:false})
            return false
        }
        if (confirm !== password) {
            toast.error('Confirm password and password do not match')
            setCheckValid({...defaultValue, isValidConfirm:false})
            return false
        }
        
        return true
    }

    const handleSignUp = async () =>{
        let check = validateData()
        
        if (check) {
            if (check === true) {
            let response =  await handleRegister(email,phone, userName, password )

            let validate = response.data // validate data từ server
            if (+validate.EC === 0){
                toast.success(validate.EM)
                setEmail('');
                setPhone('');
                setUserName('');
                setPassWord('');
                setConfirm('');
             navigate("/login");         
            } else {
                toast.error(validate.EM)
            }
            }
            
        }
    }
    return (
        
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <LeftLoginPage/>
                    <div className="right lg:w-1/2 xl:w-5/12 p-6 sm:p-12"><div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold ">
                                Đăng ký
                            </h1>
                                 <div className="mx-auto max-w-xs mt-8">
                                   <InputReuseable
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="name"
                                        className={!checkValid.isValidEmail 
                                            ? `bg-red-100 
                                            border-red-200 
                                            placeholder-red-500 
                                            focus:border-red-400` 
                                            : {}
                                            } 
                                    />
                                    <InputReuseable
                                        placeholder="Phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        name="phone"
                                        className={`mt-5 ${!checkValid.isValidPhone 
                                            ? `bg-red-100 border-red-200 
                                               placeholder-red-500 
                                               focus:border-red-400` 
                                               : ''}`
                                            }
                                    />
                                      <InputReuseable
                                        placeholder="Username"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        name="username"
                                        className={`mt-5 ${!checkValid.isValidUserName 
                                            ? `bg-red-100 border-red-200 
                                               placeholder-red-500 
                                               focus:border-red-400` 
                                               : ''}`
                                            }
                                    />
                                    <InputReuseable
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassWord(e.target.value)}
                                        name="password"
                                        className={`mt-5 ${!checkValid.isValidPassWord
                                            ? `bg-red-100 border-red-200 
                                               placeholder-red-500 
                                               focus:border-red-400` 
                                               : ''}`
                                            }
                                    />
                                    <InputReuseable
                                        placeholder="Confirm Password"
                                        type="password"
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        name="password"
                                        className={`mt-5 ${!checkValid.isValidConfirm
                                            ? `bg-red-100 border-red-200 
                                               placeholder-red-500 
                                               focus:border-red-400` 
                                               : ''}`
                                            }
                                    />
                                      

                                    <Box className='flex justify-center w-full mt-5'>
                                        <ButtonBase
                                            onClick={() => handleSignUp()}
                                            fontWeight='600'
                                            theme="submit"
                                            style={{paddingTop:'1rem',
                                                    borderRadius: '0.5rem',
                                                    paddingBottom: '1rem',
                                                    width: '100%'
                                             }}
                                        >
                                            Đăng ký
                                        </ButtonBase>
                                    </Box>
                                    <p className="mt-6 text-sm text-gray-600 text-center">
                                       Bạn đã có tài khoản? <Link to="/login" style={{color:PRIMARY.MEDIUM}}>Đăng nhập</Link> tại đây
                                    </p>
                                </div>
                        </div> 
                    </div>
                </div>
            </div>
    );
};