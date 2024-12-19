import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./ViewCourse.css";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const ViewCourse = () => {
  const { courseId } = useParams();
  const [courses, setCourses] = useState([]);
  const Location = useLocation();
  const navigate = useNavigate();
  const getbycourseid = async () => {
    try {
      const response = await axios.get(
        `/api/v1/courses/getcoursebyid/${courseId}`
      );
      console.log("ViewCourse", response.data.GetCourseById);

      if (Array.isArray(response.data.GetCourseById)) {
        setCourses(response.data.GetCourseById);
      } else if (response.data.GetCourseById) {
        // If it's not an array but a single object, wrap it in an array
        setCourses([response.data.GetCourseById]);
      } else {
        setCourses([]);
      }
      console.log("Courses: ", courses);
    } catch (error) {
      console.log("Error in ViewCourse", error);
    }
  };
  useEffect(() => {
    getbycourseid();
  }, []);
  const calculateAverageRating = (course) => {
    if (course.coursefeedback.length === 0) {
      return 0;
    }

    const totalRating = course.coursefeedback.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );
    return totalRating / course.coursefeedback.length;
  };
  const movecoursedetails = (courseId) => {
    navigate(`/user-dashboard/viewcourse/content/${courseId}`);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="coursedetailsheader">
        <button className="back-arrow-button" onClick={handleGoBack}>
          <FaArrowLeft />
        </button>
        {courses.map((course) => (
          <div className="coursedetailsimg" key={course._id}>
            <img
              src={`http://localhost:3000/media/uploads/${course.courseimg}`}
              alt="courseimg"
              className="coursedetailsinfoimg"
            />
          </div>
        ))}
        <div className="coursedetailscontainer">
          <div className="coursedetailsrow">
            {courses.map((course) => (
              <div className="coursedetailscontent" key={course._id}>
                <h2 className="coursedetailstitle">{course.coursename}</h2>
                <p className="coursedetailspara">
                  {course.courseshortdescription}
                </p>
                <ul className="coursedetailsul">
                  <li className="coursedetailslu">
                    <FaStar className="coursedetailsratingicon" />
                    <span className="coursedetailsratingvalue">
                      {calculateAverageRating(course).toFixed(1)}
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="coursedetailsoverview">
        <div className="coursedetailoverviewcontainer">
          <div className="coursedetailoverviewrow">
            {courses.map((course) => (
              <div className="coursedetailoverviewcolumn" key={course._id}>
                <h4 className="coursedetailoverviewabout">About This Course</h4>
                <p className="coursedetailoverviewpara">
                  {course.coursedescription}
                </p>
                {/* <h4 className='coursedetailoverviewabout'></h4> */}
                <p className="coursedetailoverviewpara">
                  {course.coursesubject}
                </p>
                <h4 className="coursedetailoverviewabout">Course Instructor</h4>
                <p className="coursedetailoverviewpara">
                  {course.courseinstructor}
                </p>
                {/* <h4 className='coursedetailoverviewabout'> </h4> */}
                <p className="coursedetailoverviewpara">{course.coursetages}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="coursedetailsinfo">
        {/* {courses.map((course) => (
    <div className='coursedetailsimg' key={course._id}><img src={`http://localhost:3000/media/uploads/${course.courseimg}`} alt="courseimg" className='coursedetailsinfoimg'/></div>
    ))} */}
        {courses.map((course) => (
          <div className="coursedetailsingle" key={course._id}>
            <span className="coursedetailsingleprice">
              R.s {course.courseprice}
            </span>
          </div>
        ))}
        {courses.map((course) => (
          <div class="course-feature-list" key={course._id}>
            <ul className="course-feature-listul">
              <li className="course-feature-listli">
                <h6 className="course-feature-listheading">Category</h6>
                <span className="course-feature-listspan">
                  {course.coursecategory}
                </span>
              </li>
            </ul>
          </div>
        ))}
        {courses.map((course) => (
          <div class="course-feature-list" key={course._id}>
            <ul className="course-feature-listul">
              <li className="course-feature-listli">
                <h6 className="course-feature-listheading">Duration</h6>
                <span className="course-feature-listspan">
                  {course.courseduration}
                </span>
              </li>
            </ul>
          </div>
        ))}

        {courses.map((course) => (
          <div class="course-feature-list" key={course._id}>
            <ul className="course-feature-listul">
              <li className="course-feature-listli">
                <h6 className="course-feature-listheading">Co-Level</h6>
                <span className="course-feature-listspan">
                  {course.courselevel}
                </span>
              </li>
            </ul>
            <div className="startnowcontainer">
              <button
                className="startnowbtn"
                onClick={() => movecoursedetails(course._id)}
              >
                Start Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewCourse;
