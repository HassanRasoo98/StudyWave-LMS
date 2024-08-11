import React, { useState } from "react";
import {
  FaBars,
  FaBook,
  FaGraduationCap,
  FaBloggerB,
  FaComments,
  FaFileAlt,
  FaLock,
  FaAngleDown,
  FaRedo,
  FaPlus,
  FaCircle,
  //FaTag,
  FaBlog,
  FaTicketAlt,
} from "react-icons/fa";
import { MdDashboard, MdPayment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FiBell, FiUser, FiLogOut } from "react-icons/fi";
import "./AdminHeader.css";
import { useAuth } from "../../../context/auth.js";
const AdminHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [blogsDropdownOpen, setBlogsDropdownOpen] = useState(false);
  const [testsDropdownOpen, setTestsDropdownOpen] = useState(false);
  const [payoutDropdownOpen, setPayoutDropdownOpen] = useState(false);
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [ProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleCoursesDropdown = () => {
    setCoursesDropdownOpen(!coursesDropdownOpen);
  };
  const toggleBlogsDropdown = () => {
    setBlogsDropdownOpen(!blogsDropdownOpen);
  };
  const toggleTestsDropdown = () => {
    setTestsDropdownOpen(!testsDropdownOpen);
  };
  const togglePayoutDropdown = () => {
    setPayoutDropdownOpen(!payoutDropdownOpen);
  };
  const toggleReportDropdown = () => {
    setReportDropdownOpen(!reportDropdownOpen);
  };
  const toggleAddDropdown = () => {
    setAddDropdownOpen(!addDropdownOpen);
  };
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!ProfileDropdownOpen);
  };

  return (
    <>
      <div
        className={`adminheader-position ${
          isSidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <span className="adminsidebar-toggler" onClick={toggleSidebar}>
          <FaBars className="bars-icon" />
        </span>
        <div className="admindashboard-logo">
          <NavLink className="adminlogo" to="/admin-dashboard">
            <h3 className="Adminlogoheading">StudyWave</h3>
          </NavLink>
        </div>
        <nav className="adminside-nav">
          <ul className="adminul">
            <li className="adminli">
              <NavLink to="/admin-dashboard">
                <MdDashboard className="sidebaricons" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="adminli">
              <NavLink
                to="/admin-dashboard"
                className="admindropdown-icon"
                onClick={toggleCoursesDropdown}
              >
                <FaBook className="sidebaricons" />
                <span>
                  Course <FaAngleDown className="sidebaricon2" />
                </span>
              </NavLink>
              <ul
                class="adminsub-menu"
                className={`adminsub-menu ${coursesDropdownOpen ? "open" : ""}`}
                id="course"
              >
                <li>
                  <NavLink
                    className="adminsub-menua"
                    to="/admin-dashboard/courselist"
                  >
                    Course List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="adminsub-menua"
                    to="/admin-dashboard/categorylist"
                  >
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="adminsub-menua"
                    to="/admin-dashboard/subjectlist"
                  >
                    Subject
                  </NavLink>
                </li>
                {/* <li>
                                <NavLink className="adminsub-menua" to="/admin-dashboard/taglist">Tags</NavLink>
                        </li> */}
                <li>
                  <NavLink
                    className="adminsub-menua"
                    to="/admin-dashboard/levellist"
                  >
                    Levels
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="adminli">
              <NavLink to="/admin-dashboard">
                <FaGraduationCap className="sidebaricons" />
                <span>Manage Students</span>
              </NavLink>
            </li>
            <li className="adminli">
              <NavLink
                to="/admin-dashboard"
                className="admindropdown-icon"
                onClick={toggleBlogsDropdown}
              >
                <FaBloggerB className="sidebaricons" />
                <span>
                  Blogs <FaAngleDown className="sidebaricon2" />
                </span>
              </NavLink>
              <ul
                className={`adminsub-menu ${blogsDropdownOpen ? "open" : ""}`}
                id="course"
              >
                <li>
                  <NavLink className="adminsub-menua" to="/admin-dashboard">
                    All Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink className="adminsub-menua" to="/admin-dashboard">
                    Add New Post
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="adminli">
              <NavLink to="/admin-dashboard">
                <MdPayment className="sidebaricons" />
                <span>Payment Method</span>
              </NavLink>
            </li>
            <li className="adminli">
              <NavLink
                to="/admin-dashboard"
                className="admindropdown-icon"
                onClick={toggleTestsDropdown}
              >
                <FaFileAlt className="sidebaricons" />
                <span>
                  Tests <FaAngleDown className="sidebaricon2" />
                </span>
              </NavLink>
              <ul
                className={`adminsub-menu ${testsDropdownOpen ? "open" : ""}`}
                id="course"
              >
                <li>
                  <NavLink
                    className="adminsub-menua"
                    to="/admin-dashboard/test-list"
                  >
                    Test List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="adminsub-menua"
                    to="/admin-dashboard/E-Test"
                  >
                    E-Test
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="adminli">
              <NavLink to="/admin-dashboard">
                <FaComments className="sidebaricons" />
                <span>Discussion Forum</span>
              </NavLink>
            </li>
            <li className="adminli">
              <NavLink
                to="/admin-dashboard"
                className="admindropdown-icon"
                onClick={togglePayoutDropdown}
              >
                <MdPayment className="sidebaricons" />
                <span>
                  Payout <FaAngleDown className="sidebaricon2" />
                </span>
              </NavLink>
              <ul
                className={`adminsub-menu ${payoutDropdownOpen ? "open" : ""}`}
                id="course"
              >
                <li>
                  <NavLink className="adminsub-menua" to="/admin-dashboard">
                    Payout Method
                  </NavLink>
                </li>
                <li>
                  <NavLink className="adminsub-menua" to="/admin-dashboard">
                    Payout Request
                  </NavLink>
                </li>
                <li>
                  <NavLink className="adminsub-menua" to="/admin-dashboard">
                    Payout Request List
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="adminli">
              <NavLink
                to="/admin-dashboard"
                className="admindropdown-icon"
                onClick={toggleReportDropdown}
              >
                <FaFileAlt className="sidebaricons" />
                <span>
                  Reports <FaAngleDown className="sidebaricon2" />
                </span>
              </NavLink>
              <ul
                className={`adminsub-menu ${reportDropdownOpen ? "open" : ""}`}
                id="course"
              >
                <li>
                  <NavLink className="adminsub-menua" to="/admin-dashboard">
                    Course Sale
                  </NavLink>
                </li>
                <li>
                  <NavLink className="adminsub-menua" to="/admin-dashboard">
                    Payout History
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="adminli">
              <NavLink to="/admin-dashboard">
                <FaTicketAlt className="sidebaricons" />
                <span>Manage Tickets</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="admintopnavcontainer" id="adminnavbarScroll">
        <div className="adminnavcontainerleft">
          <ul className="adminnavcontainerul">
            <li>
              <NavLink to="/admin-dashboard" className="adminnavcontainera">
                <FaRedo className="refresh-icon" />
                <span>Refresh</span>
              </NavLink>
            </li>
            <li class="adminnavdropdownli">
              <NavLink
                to="/admin-dashboard"
                className={`adminnavdropdownbtna ${
                  addDropdownOpen ? "open" : ""
                }`}
                onClick={toggleAddDropdown}
              >
                <FaPlus className="plusadd-icon" />
                <span>
                  Add new <FaAngleDown className="sidebaricon3" />
                </span>
              </NavLink>
              <ul
                className={`adminnavdropdownsubbtna ${
                  addDropdownOpen ? "open" : ""
                }`}
              >
                <li>
                  <NavLink
                    className="adminadddropdown-item"
                    to="/admin-dashboard/add-course"
                  >
                    <FaGraduationCap className="subitemnavbar-icon" />
                    <span>Add Course</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="adminadddropdown-item"
                    to="/admin-dashboard/add-category"
                  >
                    <FaCircle className="subitemnavbar-icon" />
                    <span>Add Category</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="adminadddropdown-item"
                    to="/admin-dashboard/add-subject"
                  >
                    <FaCircle className="subitemnavbar-icon" />
                    <span>Add Subject</span>
                  </NavLink>
                </li>
                {/* <li><NavLink className="adminadddropdown-item" to="/admin-dashboard/add-tags">< FaTag className='subitemnavbar-icon' /><span>Add Tags</span></NavLink></li> */}
                <li>
                  <NavLink
                    className="adminadddropdown-item"
                    to="/admin-dashboard/add-level"
                  >
                    <FaCircle className="subitemnavbar-icon" />
                    <span>Add Levels</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="adminadddropdown-item"
                    to="/admin-dashboard"
                  >
                    <FaBlog className="subitemnavbar-icon" />
                    <span>Add Blogs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="adminadddropdown-item"
                    to="/admin-dashboard"
                  >
                    <MdPayment className="subitemnavbar-icon" />
                    <span>Payout Request</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="adminadddropdown-item"
                    to="/admin-dashboard/addtest"
                  >
                    <FaFileAlt className="subitemnavbar-icon" />
                    <span>Add Test</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="adminnavcontainerright">
          <ul className="adminnavcontainerrightul">
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
                className={`adminuser-name ${
                  ProfileDropdownOpen ? "open" : ""
                }`}
                onClick={toggleProfileDropdown}
              >
                {auth?.user?.name} <FaAngleDown />
              </span>

              <ul
                className={`adminprofiledropdown ${
                  ProfileDropdownOpen ? "open" : ""
                }`}
              >
                <li>
                  <NavLink
                    to={`/admin-dashboard/manage-profile/${auth?.user?.email}`}
                    className="adminprofiledropdownsub"
                  >
                    <FiUser className="adminprofiledropdown-icon" />
                    <span>Manage Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className="adminprofiledropdownsub">
                    <FaLock className="adminprofiledropdown-icon" />
                    <span>Change Password</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className="adminprofiledropdownsub">
                    <FiLogOut className="adminprofiledropdown-icon" />
                    <span onClick={handleLogout}>Logout</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
