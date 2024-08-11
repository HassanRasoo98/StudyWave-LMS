import React, { useState, useEffect } from 'react';
import './UpdateCourse.css';
import axios from 'axios';
import AdminHeader from '../DashboardComponents/AdminHeader.js';
import { useParams,useNavigate,useLocation  } from 'react-router-dom';

const UpdateCourse = () => {
  const { courseId } = useParams();
  const [courseUpdateData, setCourseUpdateData] = useState(null); // Initialize as null
  const [data, setData] = useState([]);
  const [data2,setData2]= useState([]);
  const [data3,setData3] = useState([]);
  const [data4,setData4] = useState([]);
  const location = useLocation();
const navigate = useNavigate();
  const GetCategories = async()=>{
    try{
        const response = await axios.get('/api/v1/auth/getcategory')
        setData(response.data.categories)
        console.log("Response",response.data.categories)            
    }catch(error)
    {
        console.log(error)
    }
}
const GetTags = async()=>{
  try{
      const responses = await axios.get('/api/v1/auth/getalltags')
      setData4(responses.data.tags)
  }catch(error)
  {
      console.log(error)   
  }
}
const GetSubjects = async()=>{
  try{
      const response = await axios.get('/api/v1/auth/getallSubjects')
      setData3(response.data.subjects)
  }catch(error)
  {
      console.log(error)   
  }
}
const GetLevels = async()=>{
  try{
      const response = await axios.get('/api/v1/auth/getalllevels')
      setData2(response.data.levels)
  }catch(error)
  {
      console.log(error)
  }
}
useEffect(()=>{
    GetCategories()
    GetLevels()
        GetSubjects()
        GetTags()
},[])
  useEffect(() => {
    // Fetch course details for the specified courseId
    async function fetchCourseDetails() {
      try {
        const response = await axios.get(`/api/v1/courses/getcoursebyid/${courseId}`);
        const courseData = response.data.GetCourseById; 
        setCourseUpdateData(courseData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCourseDetails();
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const updatecoursedetails = async(event)=>{
    event.preventDefault();
    try{
      const res = await axios.put(`/api/v1/courses/updatecoursebyid/${courseId}`,courseUpdateData)
      console.log(res)
      goback()
    
    }catch(error)
    {
      console.log(error)
    }
  }
  if (courseUpdateData === null) {
    return <div>Loading...</div>;
  }
  const goback=()=>{
    navigate('/admin-dashboard/courselist')

  }
  return (
    <>
      <AdminHeader />
      <div className='addupdatecoursecontainer'>
        <div className='addupdatecourserow'>
          <div className='addupdatecoursecolumn'>
            <h3 className='addupdatecoursetitle'>Update Course</h3>
            <form className='addupdatecourseform' onSubmit={updatecoursedetails}>
            <div className='addupdatecoursediv'>
              <label className="addupdatecourseform-label">Course Code</label>
              <input
                type="text"
                id="coursecode"
                className="addupdatecourseform-input"
                placeholder="Enter Course Code"
                name="coursecode"
                value={courseUpdateData.coursecode}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecoursediv'>
              <label className="addupdatecourseform-label">Course Title</label>
              <input
                type="text"
                id="coursename"
                className="addupdatecourseform-input"
                placeholder="Enter Course Name"
                name="coursename"
                value={courseUpdateData.coursename}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecoursediv'>
                    <label for="coursecategory" className="addupdatecourseform-label">Select Category</label>
                    <select id="courseSelection" className="courseupdateselect" name = 'coursecategory'value={courseUpdateData.coursecategory} onChange={handleInputChange}>
                        <option value="" className="courseselectoptions">Choose Options...</option>
                            {Array.isArray(data) ? (
                                data.map((category) => (
                                <option key={category._id} value={category.category_title} className="courseselectoptions">{category.category_title}</option>))
                            ) : (
                                <option value="" className="courseselectoptions">Loading data...</option>)}
                    </select>


            </div>
            <div className='addupdatecoursediv'>
                    <label for="coursecategory" className="addupdatecourseform-label">Select Language</label>
                    <select id="courseSelection" className="courseupdateselect" name = 'courselanguage'value={courseUpdateData.courselanguage} onChange={handleInputChange}>
                    <option value="" className="courseselectoptions" >Choose Options...</option>
                        <option value="english" className='courseselectoptions'>English</option>
                        <option value="urdu" className='courseselectoptions'>Urdu</option>
                    </select>
            </div>
            <div className='addupdatecoursediv'>
                    <label for="coursecategory" className="addupdatecourseform-label">Select Subject</label>
                    <select id="courseSelection" className="courseupdateselect" name = 'coursesubject'value={courseUpdateData.coursesubject} onChange={handleInputChange}>
                    <option value="" className="courseselectoptions">Choose Options...</option>
                            {Array.isArray(data3) ? (
                                data3.map((Subjects) => (
                                <option key={Subjects._id} value={Subjects.subject_title} className="courseselectoptions">{Subjects.subject_title}</option>))
                            ) : (
                                <option value="" className="courseselectoptions">Loading data...</option>)}
                    </select>
            </div>
            <div className='addupdatecoursediv'>
                    <label for="coursecategory" className="addupdatecourseform-label">Select Course Level</label>
                    <select id="courseSelection" className="courseupdateselect" name = 'courselevel'value={courseUpdateData.courselevel} onChange={handleInputChange}>
                    <option value="" className="courseselectoptions">Choose Options...</option>
                        {Array.isArray(data2) ? (
                                data2.map((Level) => (
                                <option key={Level._id} value={Level.level_title} className="courseselectoptions">{Level.level_title}</option>))
                            ) : (
                                <option value="" className="courseselectoptions">Loading data...</option>)}
                    </select>
            </div>
            <div className='addupdatecoursediv'>
              <label className="addupdatecourseform-label">Course Instructor</label>
              <input
                type="text"
                id="courseinstructor"
                className="addupdatecourseform-input"
                placeholder="Enter Course Instructor"
                name="courseinstructor"
                value={courseUpdateData.courseinstructor}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecoursediv'>
              <label className="addupdatecourseform-label">Course Price</label>
              <input
                type="number"
                id="courseprice"
                className="addupdatecourseform-input"
                placeholder="Enter Course Price"
                name="courseprice"
                value={courseUpdateData.courseprice}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecoursediv'>
              <label className="addupdatecourseform-label">Course Duration</label>
              <input
                type="text"
                id="courseduration"
                className="addupdatecourseform-input"
                placeholder="36 hourse"
                name="courseduration"
                value={courseUpdateData.courseduration}
                onChange={handleInputChange}
              />
            </div>
            <div className='addupdatecoursediv'>
                    <label for="coursecategory" className="addupdatecourseform-label">Select Course Tags</label>
                    <select id="courseSelection" className="courseupdateselect" name = 'coursetages'value={courseUpdateData.coursetages} onChange={handleInputChange}>
                    <option value="" className="courseselectoptions">Choose Options...</option>
                    {Array.isArray(data4) ? (
                                data4.map((Tag) => (
                                <option key={Tag._id} value={Tag.tag_title} className="courseselectoptions">{Tag.tag_title}</option>))
                            ) : (
                                <option value="" className="courseselectoptions">Loading data...</option>)}
                    </select>
            </div>
            <div className='addupdatecoursediv'>
                    <label for="courseTitle" className="addupdatecourseform-label">Short Description</label>
                    <textarea className="addupdatecourseform-textarea" id="shortDescription" placeholder="Enter Short Description" name='courseshortdescription' value={courseUpdateData.courseshortdescription} onChange={handleInputChange}></textarea>
                </div>
                <div className='addcoursediv'>
                    <label for="courseTitle" className="addcourseform-label">Description</label>
                    <textarea className="addupdatecourseform-textarea2" id="Description" placeholder="Enter Description" name='coursedescription' value={courseUpdateData.coursedescription} onChange={handleInputChange}></textarea>
                </div>
                <div className='addupdatecoursebtncontainer'>
                    <button type='submit' className='addupdatecoursebtn'  >Update Details</button>
                </div>
          </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCourse;
