import React, { useState, useEffect } from "react";
import "./UserPage.css";
import { FaLock, FaAngleDown, FaShoppingCart, FaHeart } from "react-icons/fa";
import { FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth.js";
import axios from "axios";
import ViewCourse from "../MyCourses/ViewCourse.js";
import CourseCatalogue from "../CourseCatalogue/CourseCatalogue.js";
const UserPage = () => {
  const [ProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [itemCount, setItemCount] = useState(0);
  const userEmail = auth?.user?.email;
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const response = await axios.get(
          `/api/v1/carts/count-cartitem/${userEmail}`
        );
        setItemCount(response.data.itemCount);
      } catch (error) {
        console.error("Error fetching cart item count:", error);
      }
    };

    fetchCartItemCount();
  }, [userEmail]);
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!ProfileDropdownOpen);
  };
  return (
    <>
      <div className="usertopnavcontainer" id="usernavbarScroll">
        <div className="usernavcontainerleft">
          <ul className="usernavcontainerul">
            <li>
              <NavLink to="/user-dashboard" className="usernavcontainera">
                <span>StudyWave</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="usernavcontainerright">
          <ul className="usernavcontainerrightul">
            <li className="adminnotification">
              <NavLink to="/" className="botificationicontab">
                <FiBell />
              </NavLink>
            </li>
            <li className="adminnotification">
              <img
                src="https://faculty.spagreen.net/demo/public/images/20230813193943image_40X40_staff_12.png"
                alt=""
                className="user-avater"
              />
              <span
                className={`user-name ${ProfileDropdownOpen ? "open" : ""}`}
                onClick={toggleProfileDropdown}
              >
                {auth?.user?.name} <FaAngleDown />
              </span>

              <ul
                className={`userprofiledropdown ${
                  ProfileDropdownOpen ? "open" : ""
                }`}
              >
                <li>
                  <NavLink
                    to={`/user-dashboard/coursecatalogue`}
                    className="userprofiledropdownsub"
                  >
                    <FiUser className="adminprofiledropdown-icon" />
                    <span>Course</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/user-dashboard/mycourses`}
                    className="userprofiledropdownsub"
                  >
                    <FiUser className="adminprofiledropdown-icon" />
                    <span>My Course</span>
                  </NavLink>
                </li>
                {/* Below 12 lines are removed from comment */}
                <li>
                  <NavLink
                    to={`/user-dashboard`}
                    className="userprofiledropdownsub"
                  >
                    <FiUser className="adminprofiledropdown-icon" />
                    <span>Discussions </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/user-dashboard`}
                    className="userprofiledropdownsub"
                  >
                    <FiUser className="adminprofiledropdown-icon" />
                    <span>E-Tests </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/user-dashboard/whishlist`}
                    className="userprofiledropdownsub"
                  >
                    <FaHeart className="adminprofiledropdown-icon" />
                    <span>Wishlist</span>
                  </NavLink>
                </li>
                {/* Below 6 lines are removed from comment */}
                <li>
                  <NavLink
                    to={`/user-dashboard`}
                    className="userprofiledropdownsub"
                  >
                    <FiUser className="adminprofiledropdown-icon" />
                    <span>Performance</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/user-dashboard/add-to-cart`}
                    className="userprofiledropdownsub"
                  >
                    <FaShoppingCart className="adminprofiledropdown-icon" />
                    <span>Cart-{itemCount}</span>
                  </NavLink>
                </li>
                {/* Below 6 lines are removed from comment */}
                <li>
                  <NavLink
                    to={`/user-dashboard`}
                    className="userprofiledropdownsub"
                  >
                    <FiUser className="adminprofiledropdown-icon" />
                    <span>Create Ticket </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className="userprofiledropdownsub">
                    <FaLock className="adminprofiledropdown-icon" />
                    <span>Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className="userprofiledropdownsub">
                    <FiLogOut className="adminprofiledropdown-icon" />
                    <span onClick={handleLogout}>Logout</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
     
      {/* <ViewCourse/>    
      <CourseCatalogue/> */}
    </>
  );
};

export default UserPage;
