import React , { useState, useEffect }from 'react'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import { useParams,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios';
const UpdateSubject = () => {
    const {subjectId } = useParams();
    const [categorySubjectData, setSubjectUpdateData] = useState(null); // Initialize as null
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch course details for the specified courseId
        async function fetchSubjectDetails() {
          try {
            const response = await axios.get(`/api/v1/auth/getsubjectbyid/${subjectId}`);
            const subjectData = response.data.subject; 
            setSubjectUpdateData(subjectData);
          } catch (error) {
            console.log(error);
          }
        }
    
        fetchSubjectDetails();
      }, [subjectId]);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubjectUpdateData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const updatesubjectdetails = async(event)=>{
        event.preventDefault();
        try{
          const res = await axios.put(`/api/v1/auth/updatesubject/${subjectId}`,categorySubjectData)
          console.log(res)
          goback()
        
        }catch(error)
        {
          console.log(error)
        }
      }
      if (categorySubjectData === null) {
        return <div>Loading...</div>;
      }
      const goback=()=>{
        navigate('/admin-dashboard/subjectlist')
    
      }
  return <>
  <AdminHeader/>
  <div className='addupdatecategorycontainer'>
        <div className='addupdatecategoryrow'>
          <div className='addupdatecategorycolumn'>
            <h3 className='addupdatecategorytitle'>Update Subject</h3>
          </div>
        </div>
        <form className='addupdatecategoryform' onSubmit={updatesubjectdetails}>
        <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Subject Title</label>
              <input
                type="text"
                id="subject_title"
                className="addupdatecategoryform-input"
                placeholder="Enter Subject Title"
                name="subject_title"
                value={categorySubjectData.subject_title}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Subject Order</label>
              <input
                type="number"
                id="subject_order"
                className="addupdatecategoryform-input"
                placeholder="Enter Subject Order"
                name="subject_order"
                value={categorySubjectData.subject_order}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Subject Language</label>
              <input
                type="text"
                id="subject_language"
                className="addupdatecategoryform-input"
                placeholder="Enter Subject Language"
                name="subject_language"
                value={categorySubjectData.subject_language}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Subject Slug</label>
              <input
                type="text"
                id="subject_slug"
                className="addupdatecategoryform-input"
                placeholder="Enter Subject Slug"
                name="subject_slug"
                value={categorySubjectData.subject_slug}
                onChange={handleInputChange}
              />
            </div> */}
            <div className='addupdatecategorybtncontainer'>
                    <button type='submit' className='addupdatecategorybtn'  >Update Details</button>
                </div>
        </form>
   </div>
  </>
}

export default UpdateSubject