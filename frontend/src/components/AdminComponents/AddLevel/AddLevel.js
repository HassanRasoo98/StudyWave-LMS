import React,{useState} from 'react'
import './AddLevel.css'
import {useLocation } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import AdminHeader from '../DashboardComponents/AdminHeader.js';
const AddLevel = () => {
    const [level_title,setLevel]=useState("");
    const location = useLocation();

    const handleLevelSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('/api/v1/auth/create-level',{
                level_title
            })
            if (response.data.success)
                {
                    toast.success(response.data.message)
                    setTimeout(function () {
                        window.location.reload();
                    }, 5000);
                   
                }
                else
            {
                toast.error(response.data.message)
                  console.log('Something Went Wrong in Tag Response');
            }
        }catch(error)
        {
            console.log(error)
            toast.error("Something Went Wrong")
        }
    }
  return <>
  <AdminHeader/>
  <div className='addlevelcontainer'>
  <div className='addlevelcolumn'>
    <h3 className='addleveltitle'>Add New Level</h3>
    </div>
    <div className='addlevelformcolumn'>
        <form className='addlevelform'>
        <div className='addleveldiv'>
        <label  className="addlevelform-label">Level Title</label>
            <input type="text"  className='addlevelform-input'  
            value={level_title}
            onChange={(e) => setLevel(e.target.value)}
            placeholder="Enter Tag"
            required
            />
        </div>
        <div className='addlevelbtncontainer'>
        <button type='submit' className='addlevelbtn' onClick={handleLevelSubmit}>Submit Tag</button>
        <ToastContainer/>
        </div>
        </form>
    </div>
  </div>
  </>
}

export default AddLevel