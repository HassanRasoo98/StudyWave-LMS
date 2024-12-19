import React,{useEffect,useState} from 'react'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {FaPlus,FaEdit, FaTrash} from 'react-icons/fa'
import {useNavigate,useLocation } from 'react-router-dom'
const LevelList = () => {
    const [level, setLevels] = useState([]);
    const [searchLevelQuery, setSearchLevelQuery] = useState('');
    const [filteredLevel, setFilteredLevel] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        getallLevels();
      }, []);
      const  getallLevels = async () => {
        try {
          const res = await axios.get('/api/v1/auth/getallleveldetails');
          console.log("Res",res.data);
          setLevels(res.data);
          setFilteredLevel(res.data.levels);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        if (level.levels) {
          const filtered = level.levels.filter((levels) =>
          levels.level_title.toLowerCase().includes(searchLevelQuery.toLowerCase())
          );
          setFilteredLevel(filtered);
        }
      }, [searchLevelQuery, level]);
      const handleDeleteCourse = async (levelId) => {
        try {
          await axios.delete(`/api/v1/auth/deletelevel/${levelId}`);
          setFilteredLevel(filteredLevel.filter((level) => level._id !== levelId));
         
        } catch (error) {
          console.log(error);
        }
      };
      const handleupdateicon = async(levelId)=>{
        navigate(`/admin-dashboard/updatelevellist/${levelId}`);
      }
  return <>
  <AdminHeader/>
    <div className='categorylistheader'>
    <h3 className='categorylistheading'>Level List</h3>
   
    <div className='categorylistcontentright'>
        <NavLink to="/admin-dashboard/add-level"><FaPlus className='iconpluscourselist'/><span>Add New Level</span></NavLink>
    </div>
  </div>
  <div className='categorylistbar'>
    <input type='text' placeholder='Enter Level name' value={searchLevelQuery}
          onChange={(e) => setSearchLevelQuery(e.target.value)} className='categorylistsearchbar' />
    </div>
    <div className='tablecategorylist'>
    <table className='tabledatacategorylist'>
    <thead className='tableheadcategorylist'>
                <tr className='tableheadrowcategorylist'>
                    <th className='tableheadth'>#</th>
                    <th className='tableheadth'>Level Title</th>
                    <th className='tableheadth'>Action</th>
                </tr>
            </thead>
            <tbody>
          {filteredLevel.map((level, index) => (
            <tr key={level._id}>
              <td>{index + 1}</td>
              <td>{level.level_title}</td>
             
              <td>
              <span><FaEdit className='courselistedit' onClick={()=>handleupdateicon(level._id)} /></span>
              <span>   <FaTrash className='courselisttrash' onClick={() => handleDeleteCourse(level._id)} /></span>
           

              </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  </>
}

export default LevelList