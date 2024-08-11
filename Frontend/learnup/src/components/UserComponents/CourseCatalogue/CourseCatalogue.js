import React, { useState, useEffect } from "react";
import "./CourseCatalogue.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaStar, FaHeart } from "react-icons/fa";
import { useAuth } from "../../../context/auth.js";
import UserPage from "../UserPage/UserPage.js";
const CourseCatalogue = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [auth, setAuth] = useAuth();
  const Location = useLocation();
  const navigate = useNavigate();
  const [userWishlist, setUserWishlist] = useState([]); // Initialize as an empty array
  useEffect(() => {
    // Fetch the total number of courses from the backend
    fetch("/api/v1/courses/countcourse") // Adjust the URL to match your backend route
      .then((response) => response.json())
      .then((data) => {
        setTotalCourses(data.totalCourses);
      })
      .catch((error) => {
        console.error("Error fetching course count:", error);
      });
  }, []);
  const getCourses = async () => {
    try {
      const res = await axios.get("/api/v1/courses/getall");
      console.log(res.data.GetAllCourses);
      setCourses(res.data.GetAllCourses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  const filteredCourses = courses.filter((course) => {
    // Use the appropriate field to search (e.g., course name, category, etc.)
    return (
      course.coursename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.coursecategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const removeFromWishlist = async (courseId) => {
    try {
      const userEmail = auth?.user?.email;

      // Send a request to your backend to remove the course from the wishlist
      const response = await axios.delete(
        `/api/v1/save/remove/${userEmail}/${courseId}`
      );

      if (response.status === 200) {
        // Remove the course from the userWishlist state
        const updatedWishlist = userWishlist.filter((id) => id !== courseId);
        setUserWishlist(updatedWishlist);
        console.log("Course removed from wishlist:", courseId);
      } else {
        console.error("Failed to remove course from wishlist");
      }
    } catch (error) {
      console.error("Error removing course from the wishlist:", error);
    }
  };

  const addToWishlist = async (courseId) => {
    try {
      const userEmail = auth?.user?.email;

      // Create a copy of the user's wishlist
      const updatedWishlist = [...userWishlist];

      // Check if the course is already in the wishlist
      const index = updatedWishlist.indexOf(courseId);

      if (index !== -1) {
        // If it's already in the wishlist, remove it
        updatedWishlist.splice(index, 1);
      } else {
        // If it's not in the wishlist, add it
        updatedWishlist.push(courseId);
      }

      const response = await axios.post("/api/v1/save/wishlist/add", {
        userEmail,
        courseId,
        wishlist: updatedWishlist,
      });

      setUserWishlist(updatedWishlist);
      console.log("Course added/removed from wishlist:", courseId);
    } catch (error) {
      console.error("Unable to update course in the wishlist:", error);
    }
  };
  const addToCart = async (courseId) => {
    try {
      const userEmail = auth?.user?.email;

      const response = await axios.post("/api/v1/carts/add-to-cart", {
        userEmail,
        courseId,
      });
      if (response.status === 200) {
        // Course added to the cart successfully
        window.location.reload();
        console.log("Course added to the cart:", courseId);
        // You can also update the UI to reflect the item being added to the cart
      } else {
        console.error("Failed to add course to the cart");
      }
    } catch (error) {
      console.log("Error in Add to Cart", error);
    }
  };

  return (
    <>
      <UserPage />
      <div className="usercoursecontainer">
        <img className="userimg-cover" alt="" />
        <div className="usersubcontainer">
          <div className="userrowcontainer">
            <div className="usercolcontainer">
              <div className="usertopsearch">
                <h1 className="maincoursestitle">Courses</h1>
                <span className="dispcoursecount">{totalCourses}</span>
                <div className="usersearchinput">
                  <form className="usersearchform">
                    <div className="userform-group">
                      <input
                        type="text"
                        name="search"
                        placeholder="Search Courses"
                        className="userform-groupsearch"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <button type="submit" className="usersearchbtn">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="usercourse-container">
        {filteredCourses.map((course) => (
          <div className="usercourse-item" key={course._id}>
            <NavLink to="/" className="usercourse-item-thumb">
              <img
                src={`http://localhost:3000/media/uploads/${course.courseimg}`}
                className="usercourseimg"
                alt="Course Thumbnail"
              />
            </NavLink>
            <div className="usercourse-item-body">
              <div className="usercourse-item-body-inner">
                <div className="usercourse-item-header">
                  <ul className="usercourse-category">
                    <li>
                      <NavLink
                        to="/user-dashboard/coursecatalogue"
                        className="usercourseLabel"
                      >
                        {course.coursecategory}
                        <FaHeart
                          className={`whishlisticon ${
                            Array.isArray(userWishlist) &&
                            userWishlist.includes(course._id)
                              ? "whishlisticon-active"
                              : ""
                          }`}
                          onClick={() =>
                            Array.isArray(userWishlist) &&
                            userWishlist.includes(course._id)
                              ? removeFromWishlist(course._id)
                              : addToWishlist(course._id)
                          }
                        />
                      </NavLink>
                    </li>

                    <ul className="usercourse-item-info">
                      <li className="userrating-review">
                        <span className="usertotal-review">
                          <FaStar className="usericon-start" />
                          {calculateAverageRating(course).toFixed(1)}
                        </span>
                      </li>
                    </ul>
                  </ul>
                </div>
                <h4 className="usercoursetitle">
                  <p className="usercourseparagraph">{course.coursename}</p>
                </h4>
              </div>
              <div className="usercourse-item-footer">
                <div className="usercourse-price">R.s {course.courseprice}</div>
                <ul>
                  <li>
                    <NavLink
                      to="/user-dashboard/coursecatalogue"
                      className="userdetails-btn"
                      onClick={() => addToCart(course._id)}
                    >
                      Add to Cart
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseCatalogue;
