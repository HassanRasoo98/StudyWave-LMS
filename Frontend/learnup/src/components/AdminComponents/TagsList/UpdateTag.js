import React , { useState, useEffect }from 'react'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import { useParams,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios';
import './UpdateTag.css'
const UpdateTag = () => {
    const {tagId } = useParams();
    const [categoryTagData, setTagUpdateData] = useState(null); // Initialize as null
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch course details for the specified courseId
        async function fetchTagDetails() {
          try {
            const response = await axios.get(`/api/v1/auth/getbytagid/${tagId}`);
            const TagData = response.data.tag; 
            setTagUpdateData(TagData);
          } catch (error) {
            console.log(error);
          }
        }
    
        fetchTagDetails();
      }, [tagId]);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTagUpdateData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const updatetagdetails = async(event)=>{
        event.preventDefault();
        try{
          const res = await axios.put(`/api/v1/auth/updatetagbyid/${tagId}`,categoryTagData)
          console.log(res)
          goback()
        
        }catch(error)
        {
          console.log(error)
        }
      }
      if (categoryTagData === null) {
        return <div>Loading...</div>;
      }
      const goback=()=>{
        navigate('/admin-dashboard/taglist')
    
      }
  return <>
  <AdminHeader/>
  <div className='addupdatecategorycontainer'>
        <div className='addupdatecategoryrow'>
          <div className='addupdatecategorycolumn'>
            <h3 className='addupdatecategorytitle'>Update Subject</h3>
          </div>
        </div>
        <form className='addupdatecategoryform' onSubmit={updatetagdetails}>
        <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Tag Title</label>
              <input
                type="text"
                id="tag_title"
                className="addupdatecategoryform-input"
                placeholder="Enter Tag Title"
                name="tag_title"
                value={categoryTagData.tag_title}
                onChange={handleInputChange}
              />
            </div>
            
            <div className='addtagcategorybtncontainer'>
                    <button type='submit' className='addtagcategorybtn'  >Update Details</button>
                </div>
        </form>
   </div>
  </>
}

export default UpdateTag