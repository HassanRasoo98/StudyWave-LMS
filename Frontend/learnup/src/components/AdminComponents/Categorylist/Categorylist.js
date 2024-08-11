import React,{useEffect,useState} from 'react'
import './Categorylist.css'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {FaPlus,FaEdit, FaTrash} from 'react-icons/fa'
import {useNavigate,useLocation } from 'react-router-dom'
const Categorylist = () => {
    const [category, setCategory] = useState([]);
    const [searchCategoryQuery, setSearchCategoryQuery] = useState('');
    const [filteredCategory, setFilteredCategory] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        getallCategory();
      }, []);
     
      const getallCategory = async () => {
        try {
          const res = await axios.get('/api/v1/auth/getallcategory');
          console.log(res.data);
          setCategory(res.data);
          setFilteredCategory(res.data.categories);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        if (category.categories) {
          const filtered = category.categories.filter((cate) =>
          cate.category_title.toLowerCase().includes(searchCategoryQuery.toLowerCase())
          );
          setFilteredCategory(filtered);
        }
      }, [searchCategoryQuery, category]);
      const handleDeleteCourse = async (categoryId) => {
        try {
          await axios.delete(`/api/v1/auth/delete-category/${categoryId}`);
          setFilteredCategory(filteredCategory.filter((category) => category._id !== categoryId));
         
        } catch (error) {
          console.log(error);
        }
      };
      const handleupdateicon = async(categoryId)=>{
        navigate(`/admin-dashboard/updatecategorylist/${categoryId}`);
      }
  return <>
  <AdminHeader/>
  <div className='categorylistheader'>
    <h3 className='categorylistheading'>Category List</h3>
   
    <div className='categorylistcontentright'>
        <NavLink to="/admin-dashboard/add-category"><FaPlus className='iconpluscourselist'/><span>Add New Category</span></NavLink>
    </div>
  </div>
  <div className='categorylistbar'>
    <input type='text' placeholder='Enter Category name' value={searchCategoryQuery}
          onChange={(e) => setSearchCategoryQuery(e.target.value)} className='categorylistsearchbar' />
    </div>
    <div className='tablecategorylist'>
    <table className='tabledatacategorylist'>
    <thead className='tableheadcategorylist'>
                <tr className='tableheadrowcategorylist'>
                    <th className='tableheadth'>#</th>
                    <th className='tableheadth'>Category Title</th>
                    <th className='tableheadth'>Category Order</th>
                    <th className='tableheadth'>Category Language</th>
                    <th className='tableheadth'>Category Slug</th>
                    <th className='tableheadth'>Action</th>
                </tr>
            </thead>
            <tbody>
          {filteredCategory.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.category_title}</td>
              <td>{category.category_order}</td>
              <td>{category.category_language}</td>
              <td>{category.category_slug}</td>
              <td>
              <span><FaEdit className='courselistedit' onClick={()=>handleupdateicon(category._id)} /></span>
              <span>   <FaTrash className='courselisttrash' onClick={() => handleDeleteCourse(category._id)} /></span>
           

              </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  </>
}

export default Categorylist