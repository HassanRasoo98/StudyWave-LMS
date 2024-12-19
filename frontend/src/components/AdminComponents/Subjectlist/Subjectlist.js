import React,{useEffect,useState} from 'react'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {FaPlus,FaEdit, FaTrash} from 'react-icons/fa'
import {useNavigate,useLocation } from 'react-router-dom'
const Subjectlist = () => {
    const [subject, setSubject] = useState([]);
    const [searchSubjectQuery, setSearchSubjectQuery] = useState('');
    const [filteredSubject, setFilteredSubject] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        getallSubject();
      }, []);
      const  getallSubject = async () => {
        try {
          const res = await axios.get('/api/v1/auth/getallSubjectdetails');
          console.log("Res",res.data);
          setSubject(res.data);
          setFilteredSubject(res.data.subjects);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        if (subject.subjects) {
          const filtered = subject.subjects.filter((subjects) =>
          subjects.subject_title.toLowerCase().includes(searchSubjectQuery.toLowerCase())
          );
          setFilteredSubject(filtered);
        }
      }, [searchSubjectQuery, subject]);
      const handleDeleteCourse = async (subjectId) => {
        try {
          await axios.delete(`/api/v1/auth/deletesubject/${subjectId}`);
          setFilteredSubject(filteredSubject.filter((subject) => subject._id !== subjectId));
         
        } catch (error) {
          console.log(error);
        }
      };
      const handleupdateicon = async(subjectId)=>{
        navigate(`/admin-dashboard/updatesubjectlist/${subjectId}`);
      }
  return <>
  <AdminHeader/>
  <div className='categorylistheader'>
    <h3 className='categorylistheading'>Subject List</h3>
   
    <div className='categorylistcontentright'>
        <NavLink to="/admin-dashboard/add-subject"><FaPlus className='iconpluscourselist'/><span>Add New Subject</span></NavLink>
    </div>
  </div>
  <div className='categorylistbar'>
    <input type='text' placeholder='Enter Subject name' value={searchSubjectQuery}
          onChange={(e) => setSearchSubjectQuery(e.target.value)} className='categorylistsearchbar' />
    </div>
    <div className='tablecategorylist'>
    <table className='tabledatacategorylist'>
    <thead className='tableheadcategorylist'>
                <tr className='tableheadrowcategorylist'>
                    <th className='tableheadth'>#</th>
                    <th className='tableheadth'>Subject Title</th>
                    <th className='tableheadth'>Subject Order</th>
                    <th className='tableheadth'>Subject Language</th>
                    {/* <th className='tableheadth'>subject Slug</th> */}
                    <th className='tableheadth'>Action</th>
                </tr>
            </thead>
            <tbody>
          {filteredSubject.map((subject, index) => (
            <tr key={subject._id}>
              <td>{index + 1}</td>
              <td>{subject.subject_title}</td>
              <td>{subject.subject_order}</td>
              <td>{subject.subject_language}</td>
              {/* <td>{subject.subject_slug}</td> */}
              <td>
              <span><FaEdit className='courselistedit' onClick={()=>handleupdateicon(subject._id)} /></span>
              <span>   <FaTrash className='courselisttrash' onClick={() => handleDeleteCourse(subject._id)} /></span>
           

              </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  </>
}

export default Subjectlist