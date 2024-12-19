import React, { useState } from 'react'
import './AddCategory.css'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import {useLocation } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
const AddCategory = () => {
    const [category_title,setCategorytitle]=useState("");
    const [category_order,setCategoryOrder]=useState("");
    const [category_language,setCategoryLanguage]=useState("");
    const [category_slug,setCategorySlug]=useState("");
    const location = useLocation();

    const handleCategorySubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('/api/v1/auth/create-category',{
                category_title,
                category_order,
                category_language,
                category_slug
            })
            console.log(category_title,category_order, category_language,category_slug)
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
  <div className='addcategorycontainer'>
  <div className='addcategoryrow'>
    <div className='addcategorycolumn'>
    <h3 className='addcategorytitle'>Add New Category</h3>
    </div>
    </div>
    <form className='addcategoryform' >
    <div className='addcategorydiv'>
        <label  className="addcategoryform-label">Category Title</label>
            <input type="text"  className='addcategoryform-input'  
            value={category_title}
            onChange={(e) => setCategorytitle(e.target.value)}
            placeholder="Enter Category Title"
            required
            />
    </div>
    <div className='addcategorydiv'>
        <label  className="addcategoryform-label">Order</label>
            <input type="number"  className='addcategoryform-input'  
            value={category_order}
            onChange={(e)=>setCategoryOrder(e.target.value)}
            placeholder="Enter Order Number"
            required
            />
    </div>
    <div className='addcategorydiv'>
        <label  className="addcategoryform-label">Language</label>
            <input type="text"  className='addcategoryform-input'  
            value={category_language}
            onChange={(e)=>setCategoryLanguage(e.target.value)}
            placeholder="Enter Language"
            required
            />
    </div>
    <div className='addcategorydiv'>
        <label className="addcategoryform-label">Slug</label>
            <input type="text"  className='addcategoryform-input'  
            value={category_slug}
            onChange={(e)=>setCategorySlug(e.target.value)}
            placeholder="Enter Slug"
            required
            />
    </div>
   
    </form>
    <div className='addcategorybtncontainer'>
        <button type='submit' className='addcategorybtn' onClick={handleCategorySubmit}>Submit Category</button>
        <ToastContainer/>
    </div>
    
  </div>
  </>
}

export default AddCategory