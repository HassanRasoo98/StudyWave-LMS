import React, { useState } from 'react'
import './Login.css'
import Header from '../HomePage/Header/Header'
import {useNavigate, useLocation,  NavLink } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import axios from 'axios'
import Loader from '../Loader/Loader.js';
import { useAuth } from '../../context/auth.js';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [loading, setLoading] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    try{
      const res = await axios.post("/api/v1/auth/login",{email,password});
      console.log("Response from Server",res.data);
      if (res.data.success)
      {
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        });
        console.log('Token:', res.data.token);
        localStorage.setItem('auth',JSON.stringify(res.data))
        if (res.data.user.role) {
          navigate(location.state?.from || "/admin-dashboard");
        } else {
          navigate(location.state?.from || "/user-dashboard/coursecatalogue");
        }
      }
      else {
        toast.error(res.data.message)
      }
    }catch(error)
    {
      console.log(error)
      toast.error("Something Went Wrong")
    }
  };
  return <>
  <Header/>
  <div className='logincontainer'>
    <div className='form-shape'>
        <h3 className='logintitle'>Log in to your Account</h3>
    </div>
    <form className='loginform' onSubmit={handleSubmit}>
        <div className='formcontainer'>
        <label className='formlabel'>Email</label>
        <input
              type="email"
              className="forminput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <div className='formcontainer'>
        <label className='formlabel'>Password</label>
        <input
              type="password"
              className="forminput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <div className='formbtn'>
            <button type='submit' className='loginbtn'>Login
            {loading && <Loader />}
            </button>
        </div>
        <div className='forgetlink'>
            Forgot Password
            <NavLink to='/'>Password?</NavLink>
        </div>
        <div className='newuserlink'>
            New User?
            <NavLink to='/Signup'>Create an Account</NavLink>
        </div>
    </form>
    <ToastContainer/>
  </div>
  <div className='commonheading'>
    <div className='CTAimage'>
    <img src="https://faculty.spagreen.net/demo/public/images/20230813210029image_391x541cta_image16.png" alt="CTA image"/>
    </div>
        <h3 className='commonheadingtxt'>Ready to be a part of Learnup</h3>
        <NavLink to='/Signup' className='learnerbtn'>Sign up here</NavLink>
  </div>
  </>
}

export default Login