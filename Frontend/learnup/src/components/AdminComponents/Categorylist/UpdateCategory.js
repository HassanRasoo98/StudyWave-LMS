import React , { useState, useEffect }from 'react'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import { useParams,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios';
import './UpdateCategory.css'
const UpdateCategory = () => {
    const { categoryId } = useParams();
    const [categoryUpdateData, setcategoryUpdateData] = useState(null); // Initialize as null
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch course details for the specified courseId
        async function fetchCategoryDetails() {
          try {
            const response = await axios.get(`/api/v1/auth/getbyspecific/${categoryId}`);
            const categoryData = response.data.category; 
            setcategoryUpdateData(categoryData);
          } catch (error) {
            console.log(error);
          }
        }
    
        fetchCategoryDetails();
      }, [categoryId]);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setcategoryUpdateData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const updatecategorydetails = async(event)=>{
        event.preventDefault();
        try{
          const res = await axios.put(`/api/v1/auth/update-category/${categoryId}`,categoryUpdateData)
          console.log(res)
          goback()
        
        }catch(error)
        {
          console.log(error)
        }
      }
      if (categoryUpdateData === null) {
        return <div>Loading...</div>;
      }
      const goback=()=>{
        navigate('/admin-dashboard/categorylist')
    
      }
  return <>
  <AdminHeader/>
  <div className='addupdatecategorycontainer'>
        <div className='addupdatecategoryrow'>
          <div className='addupdatecategorycolumn'>
            <h3 className='addupdatecategorytitle'>Update Category</h3>
          </div>
        </div>
        <form className='addupdatecategoryform' onSubmit={updatecategorydetails}>
        <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Category Title</label>
              <input
                type="text"
                id="category_title"
                className="addupdatecategoryform-input"
                placeholder="Enter Category Title"
                name="category_title"
                value={categoryUpdateData.category_title}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Category Order</label>
              <input
                type="number"
                id="category_order"
                className="addupdatecategoryform-input"
                placeholder="Enter Category Order"
                name="category_order"
                value={categoryUpdateData.category_order}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Category Language</label>
              <input
                type="text"
                id="category_language"
                className="addupdatecategoryform-input"
                placeholder="Enter Category Language"
                name="category_language"
                value={categoryUpdateData.category_language}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Category Slug</label>
              <input
                type="text"
                id="category_slug"
                className="addupdatecategoryform-input"
                placeholder="Enter Category Slug"
                name="category_slug"
                value={categoryUpdateData.category_slug}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecategorybtncontainer'>
                    <button type='submit' className='addupdatecategorybtn'  >Update Details</button>
                </div>
        </form>
   </div>
  </>
}

export default UpdateCategory