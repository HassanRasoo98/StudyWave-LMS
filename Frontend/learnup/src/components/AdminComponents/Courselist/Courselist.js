import React, { useState, useEffect } from "react";
import "./Courselist.css";
import AdminHeader from "../DashboardComponents/AdminHeader.js";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
const Courselist = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const res = await axios.get("/api/v1/courses/getall");
      console.log(res.data);
      setCourses(res.data);
      setFilteredCourses(res.data.GetAllCourses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (courses.GetAllCourses) {
      const filtered = courses.GetAllCourses.filter((course) =>
        course.coursename.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/v1/courses/deletecourse/${courseId}`);
      setFilteredCourses(
        filteredCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleupdateicon = async (courseId) => {
    navigate(`/admin-dashboard/courselist/${courseId}`);
  };
  return (
    <>
      <AdminHeader />
      <div className="courselistheader">
        <h3 className="courselistheading">Course List</h3>

        <div className="courselistcontentright">
          <NavLink to="/admin-dashboard/add-course">
            <FaPlus className="iconpluscourselist" />
            <span>Add New Course</span>
          </NavLink>
        </div>
      </div>
      <div className="courselistbar">
        <input
          type="text"
          placeholder="Enter Course name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="courselistsearchbar"
        />
      </div>
      <div className="tablecourselist">
        <table className="tabledatacourselist">
          <thead className="tableheadcourselist">
            <tr className="tableheadrowcourselist">
              <th className="tableheadth">#</th>
              <th className="tableheadth">Title</th>
              <th className="tableheadth">Category</th>
              <th className="tableheadth">Instructor</th>
              <th className="tableheadth">Enrolled Students</th>
              <th className="tableheadth">Price</th>
              <th className="tableheadth">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.coursename}</td>
                <td>{course.coursecategory}</td>
                <td>{course.courseinstructor}</td>
                <td>{course.enrolledstudents}</td>
                <td>{course.courseprice}</td>
                <td>
                  <span>
                    <FaEdit
                      className="courselistedit"
                      onClick={() => handleupdateicon(course._id)}
                    />
                  </span>
                  <span>
                    {" "}
                    <FaTrash
                      className="courselisttrash"
                      onClick={() => handleDeleteCourse(course._id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Courselist;
