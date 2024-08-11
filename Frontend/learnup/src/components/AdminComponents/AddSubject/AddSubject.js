import React,{useState} from 'react'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import './AddSubject.css'
import {useLocation } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
const AddSubject = () => {
    const [subject_title,setSubjecttitle]=useState("");
    const [subject_order,setSubjectOrder]=useState("");
    const [subject_language,setSubjectLanguage]=useState("");
    //const [subject_slug,setSubjectSlug]=useState("");
    const location = useLocation();
    const handleSubjectSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('/api/v1/auth/create-subject',{
                subject_title,
                subject_order,
                subject_language,
                //subject_slug
            })
            console.log(subject_title,subject_order,subject_language)//subject_slug
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
                  console.log('Something Went Wrong in Signup Response');
            }
        }catch(error)
        {
            console.log(error)
            toast.error("Something Went Wrong")
        }
    }
  return <>
    <AdminHeader/>
    <div className='addsubjectcontainer'>
  <div className='addsubjectrow'>
    <div className='addsubjectcolumn'>
    <h3 className='addsubjecttitle'>Add New Subject</h3>
    </div>
    </div>
    <form className='addsubjectform' >
    <div className='addsubjectdiv'>
        <label  className="addsubjectform-label">Subject Title</label>
            <input type="text"  className='addsubjectform-input'  
            value={subject_title}
            onChange={(e) => setSubjecttitle(e.target.value)}
            placeholder="Enter Subject Title"
            required
            />
    </div>
    <div className='addsubjectdiv'>
        <label  className="addsubjectform-label">Order</label>
            <input type="number"  className='addsubjectform-input'  
            value={subject_order}
            onChange={(e)=>setSubjectOrder(e.target.value)}
            placeholder="Enter Order Number"
            required
            />
    </div>
    <div className='addsubjectdiv'>
        <label  className="addsubjectform-label">Language</label>
            <input type="text"  className='addsubjectform-input'  
            value={subject_language}
            onChange={(e)=>setSubjectLanguage(e.target.value)}
            placeholder="Enter Language"
            required
            />
    </div>
    {/* <div className='addsubjectdiv'>
        <label className="addsubjectform-label">Slug</label>
            <input type="text"  className='addsubjectform-input'  
            value={subject_slug}
            onChange={(e)=>setSubjectSlug(e.target.value)}
            placeholder="Enter Slug"
            required
            />
    </div> */}
   
    </form>
    <div className='addsubjectbtncontainer'>
        <button type='submit' className='addsubjectbtn' onClick={handleSubjectSubmit}>Submit Subject</button>
        <ToastContainer/>
    </div>
    
  </div>
  </>
}

export default AddSubject;