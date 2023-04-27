import React, { useEffect, useState } from 'react'
import { useCurrentState } from '../../Context/context'

const Login = ({ webSocket, userDetailsKey }) => {

    const [userNameInputValue, setUserNameInputValue] = useState("")
    const [userDetailState, dispatch] = useCurrentState();

    const submitLoginForm = (e) => {
        e.preventDefault();
        if (userNameInputValue.length > 0) {
            let prevUserDetails = JSON.parse(localStorage.getItem(userDetailsKey))
            let title = "userName"
            let userLogin = true;
            let userName = userNameInputValue;
            let masterKey = userDetailsKey;

            dispatch({
                type: "update_login",
                userLogin: true
            })

            dispatch({
                type: "update_userName",
                userName
            })

            dispatch({
                type: "update_masterKey",
                masterKey: masterKey
            })

            setUserNameInputValue("")

            localStorage.setItem(userDetailsKey, JSON.stringify({
                ...prevUserDetails,
                userLogin,
                userName,
                masterKey
            }))

            console.log(userDetailState);

        }
    }
    return (
        <div className='w-[95%] h-full mx-auto flex flex-col items-center justify-center'>
            <form onSubmit={submitLoginForm} className='h-4/5 flex items-center justify-center flex-col w-full mx-auto xs:w-[320px]'>
                <input className='w-full p-1 rounded-sm	border border-slate-400 focus:outline-slate-500' type="text" placeholder="Enter Your Username" value={userNameInputValue} onChange={(e) => {
                    setUserNameInputValue(e.target.value);
                }} />
                <button type="submit" className='w-3/4 py-1 mx-auto border-slate-400 outline-none my-5 transition-all duration-[0.5] ease-in-out bg-blue-500 focus:outline-slate-500 block active:bg-blue-500 hover:bg-blue-600 hover:text-white'>Login</button>

            </form>

        </div>
    )
}

export { Login }