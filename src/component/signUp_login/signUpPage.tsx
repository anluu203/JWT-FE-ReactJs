import { useState } from "react";
import { Link } from "react-router-dom";
import LeftLoginPage from "./leftLoginPage";
import {  toast } from "react-toastify";
export const SignUpPage = () => {

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [confirm, setConfirm] = useState('')
    
    const validateData = ():boolean =>{
        if (!email) {
            toast.error('Email is required !')
            return false
        }
        if (!phone) {
            toast.error('Phone number is required !')
            return false
        }
        if (!userName) {
            toast.error('Username is required !')
            return false
        }
        if (!password) {
            toast.error('Password is required !')
            return false
        }
        if (!confirm) {
            toast.error('Confirm password is required !')
            return false
        }
        if (confirm != password) {
            toast.error('Confirm password and password do not match')
            return false
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error('Please enter a valid email address')
            return false
        }
        return true
    }

    const handleSignUp = ():any =>{
        let check = validateData()
        if (check) {
            let userData = {
                email: email,
                phone: phone,
                userName: userName,
                password: password,
                confirm: confirm
            }
            toast.success('SignUp successful')
            console.log('check userData:', userData)
            setEmail('');
            setPhone('');
            setUserName('');
            setPassWord('');
            setConfirm('');
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
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email" placeholder="Email address"
                                        value={email} onChange={(e) => setEmail(e.target.value) }
                                        />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="text" placeholder="Phone number"
                                        value={phone} onChange={(e) => setPhone(e.target.value) } />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="text" placeholder="Username" 
                                        value={userName} onChange={(e) => setUserName(e.target.value) } />           
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password" placeholder="Password" 
                                        value={password} onChange={(e) => setPassWord(e.target.value) } />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password" placeholder=" Confirm password" 
                                        value={confirm} onChange={(e) => setConfirm(e.target.value) } />    
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center 
                                        justify-center focus:shadow-outline focus:outline-none"
                                        onClick={ () => handleSignUp()}
                                        >
                                        <span className="ml-3">
                                            Đăng ký
                                        </span>
                                    </button>
                                    <p className="mt-6 text-sm text-gray-600 text-center">
                                   
                                       Bạn đã có tài khoản? <Link to="/" className="text-indigo-500">Đăng nhập</Link> tại đây
                                    </p>
                                </div>
                        </div> 
                    </div>
                </div>
            </div>
    );
};