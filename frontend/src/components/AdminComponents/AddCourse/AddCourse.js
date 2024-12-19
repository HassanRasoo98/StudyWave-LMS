import React, { useState, useEffect } from "react";
import "./AddCourse.css";
import axios from "axios";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../DashboardComponents/AdminHeader.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    coursecode: "",
    coursename: "",
    coursecategory: "",
    courselanguage: "",
    coursesubject: "",
    courselevel: "",
    courseinstructor: "",
    courseprice: "",
    courseduration: "",
    coursetages: "",
    coursedescription: "",
    courseshortdescription: "",
  });

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const GetTags = async () => {
    try {
      const responses = await axios.get("/api/v1/auth/getalltags");
      setData4(responses.data.tags);
    } catch (error) {
      console.log(error);
    }
  };
  const GetSubjects = async () => {
    try {
      const response = await axios.get("/api/v1/auth/getallSubjects");
      setData3(response.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };
  const GetLevels = async () => {
    try {
      const response = await axios.get("/api/v1/auth/getalllevels");
      setData2(response.data.levels);
    } catch (error) {
      console.log(error);
    }
  };
  const GetCategories = async () => {
    try {
      const response = await axios.get("/api/v1/auth/getcategory");
      setData(response.data.categories);
      console.log("Response", response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetCategories();
    GetLevels();
    GetSubjects();
    GetTags();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSavedetailsbtn = async (event) => {
    event.preventDefault();

    try {
      console.log("coursecode", courseData.coursecode);
      console.log("coursename", courseData.coursename);
      if (!courseData.coursecode) {
        toast.error("Please enter coursecode");
        return;
      }
      if (!courseData.coursename) {
        toast.error("Please enter coursename");
        return;
      }

      if (!courseData.coursecategory) {
        toast.error("Please enter coursecategory");
        return;
      }

      if (!courseData.courselanguage) {
        toast.error("Please enter course language");
        return;
      }

      //   if (!courseData.coursesubject) {
      //     toast.error('Please enter course subjects');
      //     return;
      //   }

      if (!courseData.courselevel) {
        toast.error("Please enter course level");
        return;
      }

      if (!courseData.courseinstructor) {
        toast.error("Please enter course instructor");
        return;
      }

      if (!courseData.courseprice) {
        toast.error("Please enter course price");
        return;
      }

      if (!courseData.courseduration) {
        toast.error("Please enter course duration");
        return;
      }

      //   if (!courseData.coursetages) {
      //     toast.error('Please enter course tags');
      //     return;
      //   }

      if (!courseData.coursedescription) {
        toast.error("Please enter course description");
        return;
      }

      //   if (!courseData.courseshortdescription) {
      //     toast.error('Please enter course short description');
      //     return;
      //   }

      // Create a new FormData instance

      // Make the POST request with the proper headers
      const response = await axios.post(
        "/api/v1/courses/createcourse",
        courseData
      );
      console.log("coursecode2", courseData.coursecode);
      if (response.data.success) {
        toast.success("Course created successfully");
        navigate(`/admin-dashboard/media-images/${courseData.coursecode}`);
      } else {
        toast.error("An error occurred while creating the course");
      }
    } catch (error) {
      if (error.response) {
        // Handle specific error responses
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the course");
      }

      console.error(error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="addcoursecontainer">
        <div className="addcourserow">
          <div className="addcoursecolumn">
            <h3 className="addcoursetitle">Add New Course</h3>
            <div className="adddefaulttabs">
              <ul className="adddefaulttabsul">
                <li className="adddefaulttabsli">
                  <NavLink to="/">
                    <span className="adddefaulttabsspan">1.</span>Basic
                    Information
                  </NavLink>
                </li>
                <li className="adddefaulttabsli">
                  <NavLink to="/">
                    <span className="adddefaulttabsspan">2.</span>Media & Images
                  </NavLink>
                </li>
              </ul>
            </div>
            <form className="addcourseform" onSubmit={handleSavedetailsbtn}>
              <div className="addcoursediv">
                <label className="addcourseform-label">Course Code</label>
                <input
                  type="text"
                  id="coursecode"
                  className="addcourseform-input"
                  placeholder="Enter Course Codes"
                  name="coursecode" // This is the name attribute
                  value={courseData.coursecode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="addcoursediv">
                <label for="coursename" className="addcourseform-label">
                  Course Title
                </label>
                <input
                  type="text"
                  id="coursename"
                  className="addcourseform-input"
                  placeholder="Enter Course Title"
                  name="coursename"
                  value={courseData.coursename}
                  onChange={handleInputChange}
                />
              </div>
              <div className="addcoursediv">
                <label for="coursecategory" className="addcourseform-label">
                  Select Category
                </label>
                <select
                  id="courseSelection"
                  className="courseselect"
                  name="coursecategory"
                  value={courseData.coursecategory}
                  onChange={handleInputChange}
                >
                  <option value="" className="courseselectoptions">
                    Choose Options...
                  </option>
                  {Array.isArray(data) ? (
                    data.map((category) => (
                      <option
                        key={category._id}
                        value={category.category_title}
                        className="courseselectoptions"
                      >
                        {category.category_title}
                      </option>
                    ))
                  ) : (
                    <option value="" className="courseselectoptions">
                      Loading data...
                    </option>
                  )}
                </select>
              </div>
              <div className="addcoursediv">
                <label for="courselanguage" className="addcourseform-label">
                  Select Language
                </label>
                <select
                  id="courseSelection"
                  className="courseselect"
                  name="courselanguage"
                  value={courseData.courselanguage}
                  onChange={handleInputChange}
                >
                  <option value="" className="courseselectoptions">
                    Choose Options...
                  </option>
                  <option value="english" className="courseselectoptions">
                    English
                  </option>
                  <option value="urdu" className="courseselectoptions">
                    Urdu
                  </option>
                </select>
              </div>
              {/* <div className='addcoursediv'>
                    <label for="coursesubject" className="addcourseform-label">Select Subject</label>
                    <select id="courseSelection" className='courseselect' name='coursesubject' value={courseData.coursesubject} onChange={handleInputChange}>
                    <option value="" className="courseselectoptions">Choose Options...</option>
                            {Array.isArray(data3) ? (
                                data3.map((Subjects) => (
                                <option key={Subjects._id} value={Subjects.subject_title} className="courseselectoptions">{Subjects.subject_title}</option>))
                            ) : (
                                <option value="" className="courseselectoptions">Loading data...</option>)}
                    </select>
                </div> */}
              <div className="addcoursediv">
                <label for="courselevel" className="addcourseform-label">
                  Select Course Level
                </label>
                <select
                  id="courseSelection"
                  className="courseselect"
                  name="courselevel"
                  value={courseData.courselevel}
                  onChange={handleInputChange}
                >
                  <option value="" className="courseselectoptions">
                    Choose Options...
                  </option>
                  {Array.isArray(data2) ? (
                    data2.map((Level) => (
                      <option
                        key={Level._id}
                        value={Level.level_title}
                        className="courseselectoptions"
                      >
                        {Level.level_title}
                      </option>
                    ))
                  ) : (
                    <option value="" className="courseselectoptions">
                      Loading data...
                    </option>
                  )}
                </select>
              </div>
              <div className="addcoursediv">
                <label for="courseprice" className="addcourseform-label">
                  Course Instructor
                </label>
                <input
                  type="text"
                  className="addcourseform-input"
                  placeholder="Enter Course Instructor"
                  name="courseinstructor"
                  value={courseData.courseinstructor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="addcoursediv">
                <label for="courseprice" className="addcourseform-label">
                  Course Price
                </label>
                <input
                  type="number"
                  className="addcourseform-input"
                  placeholder="Enter Course Price"
                  name="courseprice"
                  value={courseData.courseprice}
                  onChange={handleInputChange}
                />
              </div>
              <div className="addcoursediv">
                <label for="courseduration" className="addcourseform-label">
                  Course Duration
                </label>
                <input
                  type="number"
                  className="addcourseform-input"
                  placeholder="36 Hours"
                  name="courseduration"
                  value={courseData.courseduration}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className='addcoursediv'>
                    <label for="coursetags" className="addcourseform-label">Select Tags</label>
                    <select id="courseSelection" className='courseselect' name='coursetages' value={courseData.coursetages} onChange={handleInputChange}  >
                    <option value="" className="courseselectoptions">Choose Options...</option>
                    {Array.isArray(data4) ? (
                                data4.map((Tag) => (
                                <option key={Tag._id} value={Tag.tag_title} className="courseselectoptions">{Tag.tag_title}</option>))
                            ) : (
                                <option value="" className="courseselectoptions">Loading data...</option>)}
                    </select>
                </div> */}
              {/* <div className='addcoursediv'>
                        <label for="courseTitle" className="addcourseform-label">Short Description</label>
                        <textarea className="addcourseform-textarea" id="shortDescription" placeholder="Enter Short Description" name='courseshortdescription' value={courseData.courseshortdescription} onChange={handleInputChange}></textarea>
                    </div> */}
              <div className="addcoursediv">
                <label for="courseTitle" className="addcourseform-label">
                  Description
                </label>
                <textarea
                  className="addcourseform-textarea2"
                  id="Description"
                  placeholder="Enter Description"
                  name="coursedescription"
                  value={courseData.coursedescription}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="addcoursebtncontainer">
                <button type="submit" className="addcoursebtn">
                  SaveDetails
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
