import React, { useState } from 'react'
import "./register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { proxy } from '../../config'
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState();
  const [registering, setRegistering] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistering(true)
    setError(false);
    if (!checkPassword()) {
      setRegistering(false);
      return;
    }



    try {

      const res = await axios.post(proxy + "/auth/register",
        {
          username, email, password
        });
      toast.success('Registration done Successfully');
      res.data && navigate("/login");
    } catch (error) {
      toast.error("something went wrong ", {
        autoClose: 4000
      });
      toast.error("try different username and email", {
        autoClose: 5000
      });
      setError(true);
    }
    finally {
      setRegistering(false);
    }

  }
  const checkPassword = () => {
    if (!password) {
      toast.error("Password cannot be empty");
      return false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[@#$%^&+=]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long and include a mix of  lowercase, digits, and special characters.");
      return false;
    }

    return true;
  };



  return (

    <div className="register">
      <div className='registerWrapper'>
        <span>Register Here</span>
        <form onSubmit={handleSubmit} className="registerForm">
          <label htmlFor="">Username</label>
          <input className='registerInput'
            type="text" placeholder='Username'
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="">Email</label>
          <input className='registerInput'
            type="text" placeholder='Enter You Email..'
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="" >Password</label>
          <input className='registerInput'
            type="password"
            placeholder='Enter Your Password'
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="registerButton"
            type='submit'
            disabled={registering}
          >Register </button>
        </form>
        <Link to={"/login"} >Login Now</Link>
      </div>
    </div>
  )
}

export default Register