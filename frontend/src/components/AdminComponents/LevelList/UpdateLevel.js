import React , { useState, useEffect }from 'react'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import { useParams,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios';

const UpdateLevel = () => {
    const {levelId } = useParams();
    const [categoryLevelData, setLevelUpdateData] = useState(null); // Initialize as null
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch course details for the specified courseId
        async function fetchLevelDetails() {
          try {
            const response = await axios.get(`/api/v1/auth/getlevelbyid/${levelId}`);
            const LevelData = response.data.level; 
            setLevelUpdateData(LevelData);
          } catch (error) {
            console.log(error);
          }
        }
    
        fetchLevelDetails();
      }, [levelId]);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLevelUpdateData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const updateLeveldetails = async(event)=>{
        event.preventDefault();
        try{
          const res = await axios.put(`/api/v1/auth/updatelevel/${levelId}`,categoryLevelData)
          console.log(res)
          goback()
        
        }catch(error)
        {
          console.log(error)
        }
      }
      if (categoryLevelData === null) {
        return <div>Loading...</div>;
      }
      const goback=()=>{
        navigate('/admin-dashboard/levellist')
    
      }
  return <>
   <AdminHeader/>
  <div className='addupdatecategorycontainer'>
        <div className='addupdatecategoryrow'>
          <div className='addupdatecategorycolumn'>
            <h3 className='addupdatecategorytitle'>Update Level</h3>
          </div>
        </div>
        <form className='addupdatecategoryform' onSubmit={updateLeveldetails}>
        <div className='addupdatecategorydiv'>
              <label className="addupdatecategoryform-label">Level Title</label>
              <input
                type="text"
                id="level_title"
                className="addupdatecategoryform-input"
                placeholder="Enter Level Title"
                name="level_title"
                value={categoryLevelData.level_title}
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

export default UpdateLevel