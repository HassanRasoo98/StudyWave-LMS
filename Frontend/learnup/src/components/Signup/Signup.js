import React , { useState } from 'react'
import Header from '../HomePage/Header/Header'
import './Signup.css'
import { NavLink,useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const handleCreateAccount = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
      });
      console.log(name,email,password);
      if (response.data.success)
      {
        toast.success(response.data.message)
        navigate('/login');
      }
      else
      {
        toast.error(response.data.message)
        console.log('Something Went Wrong in Signup Response');
      }
    }
    catch(error)
    {
      console.error(error);

    }
  }
  return <>
    <Header/>
    <div className='signupcontainer'>
    <div className='signup-shape'>
        <h3 className='signuptitle'>Create your Account</h3>
    </div>
    <form className='signupform'  onSubmit={handleCreateAccount}>
    <div className='signupformcontainer'>
        <label className='signuplabel'>Username</label>
        <input
              type="text"
              className="signupinput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
        </div>
        <div className='signupformcontainer'>
        <label className='signuplabel'>Email</label>
        <input
              type="email"
              className="signupinput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        
        <div className='signupformcontainer'>
        <label className='signuplabel'>Password</label>
        <input
              type="password"
              className="signupinput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <div className='signupformcontainer'>
        <label className='signuplabel'>Confirm Password</label>
        <input
              type="password"
              className="signupinput"

            />
        </div>
        <div className='formsignupbtn'>
            <button type='submit' className='signupbtn'  >Create Account</button>

            <ToastContainer/>
        </div>
        <div className='alreadylink'>
            Already have an account ?
            <NavLink to='/login'>Login here</NavLink>
        </div>
    </form>
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

export default Signup