import React,{useEffect,useState} from 'react'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {FaPlus,FaEdit, FaTrash} from 'react-icons/fa'
import {useNavigate,useLocation } from 'react-router-dom'
const TagList = () => {
    const [tag, setTags] = useState([]);
    const [searchTagQuery, setSearchTagQuery] = useState('');
    const [filteredTag, setFilteredTag] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        getallSubject();
      }, []);
      const  getallSubject = async () => {
        try {
          const res = await axios.get('/api/v1/auth/getalltagsdetails');
          console.log("Res",res.data);
          setTags(res.data);
          setFilteredTag(res.data.tags);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        if (tag.tags) {
          const filtered = tag.tags.filter((tags) =>
          tags.tag_title.toLowerCase().includes(searchTagQuery.toLowerCase())
          );
          setFilteredTag(filtered);
        }
      }, [searchTagQuery, tag]);
      const handleDeleteCourse = async (tagId) => {
        try {
          await axios.delete(`/api/v1/auth/deletetag/${tagId}`);
          setFilteredTag(filteredTag.filter((tag) => tag._id !== tagId));
         
        } catch (error) {
          console.log(error);
        }
      };
      const handleupdateicon = async(tagId)=>{
        navigate(`/admin-dashboard/updatetaglist/${tagId}`);
      }
  return <>
    <AdminHeader/>
    <div className='categorylistheader'>
    <h3 className='categorylistheading'>Tag List</h3>
   
    <div className='categorylistcontentright'>
        <NavLink to="/admin-dashboard/add-tags"><FaPlus className='iconpluscourselist'/><span>Add New Tag</span></NavLink>
    </div>
  </div>
  <div className='categorylistbar'>
    <input type='text' placeholder='Enter Tag name' value={searchTagQuery}
          onChange={(e) => setSearchTagQuery(e.target.value)} className='categorylistsearchbar' />
    </div>
    <div className='tablecategorylist'>
    <table className='tabledatacategorylist'>
    <thead className='tableheadcategorylist'>
                <tr className='tableheadrowcategorylist'>
                    <th className='tableheadth'>#</th>
                    <th className='tableheadth'>Tag Title</th>
                    <th className='tableheadth'>Action</th>
                </tr>
            </thead>
            <tbody>
          {filteredTag.map((tag, index) => (
            <tr key={tag._id}>
              <td>{index + 1}</td>
              <td>{tag.tag_title}</td>
             
              <td>
              <span><FaEdit className='courselistedit' onClick={()=>handleupdateicon(tag._id)} /></span>
              <span>   <FaTrash className='courselisttrash' onClick={() => handleDeleteCourse(tag._id)} /></span>
           

              </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  </>
}

export default TagList