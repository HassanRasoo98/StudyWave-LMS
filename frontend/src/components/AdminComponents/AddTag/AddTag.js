/*import React,{useState} from 'react'
import './AddTag.css'
import {useLocation } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import AdminHeader from '../DashboardComponents/AdminHeader.js';
const AddTag = () => {
    const [tag_title,setTitle]=useState("");
    const location = useLocation();

    const handleTagSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('/api/v1/auth/create-tag',{
                tag_title
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
  <div className='addtagcontainer'>
  <div className='addtagcolumn'>
    <h3 className='addtagtitle'>Add New Tag</h3>
    </div>
    <div className='addtagformcolumn'>
        <form className='addtagform'>
        <div className='addtagdiv'>
        <label  className="addtagform-label">Tag Title</label>
            <input type="text"  className='addtagform-input'  
            value={tag_title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Tag"
            required
            />
        </div>
        <div className='addtagbtncontainer'>
        <button type='submit' className='addtagbtn' onClick={handleTagSubmit}>Submit Tag</button>
        <ToastContainer/>
        </div>
        </form>
    </div>
  </div>
  </>
}

export default AddTag
*/