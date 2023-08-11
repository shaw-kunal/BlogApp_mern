import React, { useContext, useRef } from 'react'
import "./login.css"
import { Link, json } from 'react-router-dom'

import { LoginFailure, loginStart, loginSuccess } from '../../context/Action';
import axios from 'axios';
import { proxy } from '../../config';
import { Context } from '../../context/Context'
import { toast } from 'react-toastify';

const Login = () => {

    const userRef = useRef();
    const passRef = useRef();

    const { user, dispatch, isFetching, error } = useContext(Context)


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {

               
                const res = await axios.post(proxy + "/auth/login",
                {
                    username: userRef.current.value,
                    password: passRef.current.value
                })
                console.log(res)
                dispatch(loginSuccess(res.data));
      
            //    console.log(res.data)
            // console.log("isFe "+user)

        } catch (error) {
            toast.error(error.response.data)
            dispatch(LoginFailure())
        }
    }

    console.log("isFetching " + isFetching)
    console.log(user)
    console.log("error" + error)
    return (
        <div className="login">
            <div className='loginWrapper'>
                <span>Login Here</span>
                <form action="" className="loginForm" onSubmit={handleSubmit} >
                    <label htmlFor="">Username</label>
                    <input ref={userRef} className='loginInput' type="text" placeholder='Enter You username..' />
                    <label htmlFor="" >Password</label>
                    <input ref={passRef} className='loginInput' type="password" placeholder='Enter Your Password' />
                    <button className="loginButton" type='submit'>Login</button>
                    {
                        isFetching && <div className="overlay">
                            <div className="loading-spinner">
                            </div>
                        </div>
                    }
                </form>
                <Link to={"/register"} >Did't have Account? Register Now</Link>
            </div>
        </div>

    )
}

export default Login