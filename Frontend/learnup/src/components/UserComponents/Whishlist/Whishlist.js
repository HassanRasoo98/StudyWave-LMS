import React, { useState, useEffect } from "react";
import UserPage from "../UserPage/UserPage.js";
import { useAuth } from "../../../context/auth.js";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Whishlist.css";
import axios from "axios";
import { FaStar, FaHeart } from "react-icons/fa";
const Whishlist = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [auth, setAuth] = useAuth();
  const [userWishlist, setUserWishlist] = useState([]);
  const Location = useLocation();
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    // Make an HTTP GET request to the route that fetches wishlist courses
    axios
      .get("/api/v1/save/getcoursesfromwhishlist", {
        params: {
          userEmail: auth?.user?.email, // Replace with the actual user's email
        },
      })
      .then((response) => {
        setUserWishlist(response.data.wishlistCourses);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist courses:", error);
      });
  }, []);

  useEffect(() => {
    // Make an HTTP GET request to the route that counts wishlist courses
    axios
      .get("/api/v1/save/countwhishlist", {
        params: {
          userEmail: auth?.user?.email, // Replace with the actual user's email
        },
      })
      .then((response) => {
        setTotalCourses(response.data.count);
      })
      .catch((error) => {
        console.error("Error counting wishlist courses:", error);
      });
  }, []);
  const filteredCourses = userWishlist.filter((course) => {
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
        window.location.reload();
        console.log("Course removed from wishlist:", courseId);
      } else {
        console.error("Failed to remove course from wishlist");
      }
    } catch (error) {
      console.error("Error removing course from the wishlist:", error);
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
                <h1 className="maincoursestitle">My Wishlist</h1>
                <span className="dispcoursecount">{totalCourses}</span>
                <div className="usersearchinput">
                  <form className="usersearchform">
                    <div className="userform-group">
                      <input
                        type="text"
                        name="search"
                        placeholder="Search Wishlist Courses"
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
                        to="/user-dashboard/whishlist"
                        className="usercourseLabel"
                      >
                        {course.coursecategory}
                        <FaHeart
                          className={`subwhishlisticon ${
                            Array.isArray(userWishlist) &&
                            userWishlist.includes(course._id)
                              ? "whishlisticon-active"
                              : ""
                          }`}
                          onClick={() => removeFromWishlist(course._id)}
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
                    <a href="/" className="userdetails-btn">
                      Add to Card
                    </a>
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

export default Whishlist;
