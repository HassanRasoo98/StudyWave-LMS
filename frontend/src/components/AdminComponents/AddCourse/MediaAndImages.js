import React, { useState } from "react";
import "./MediaAndImages.css";
import AdminHeader from "../DashboardComponents/AdminHeader.js";
import { NavLink, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const MediaAndImages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { coursecode } = useParams();
  const [courseData, setCourseData] = useState({
    courseimg: null,
    coursevideos: [],
    coursecode: coursecode,
  });
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageURL = window.URL.createObjectURL(file);
    setCourseData((prevData) => ({ ...prevData, courseimg: file }));
  };

  /*
      const handleVideoUpload = (e) => {
      const videos = Array.from(e.target.files);
      const videoData = videos.map((video) => ({
        file: video,
        name: video.name,
      }));
      // setCourseData((prevData) => ({
      //   ...prevData,
      //   coursevideos:
      // }));
      setCourseData((prevData) => ({ ...prevData, coursevideos: videoData }));
    };
    */

  const handleVideoUpload = (e) => {
    const videos = Array.from(e.target.files);

    const videoData = videos.map((file) => ({
      file: file,
      name: file.name,
    }));

    // Append the new videos to the existing ones, ensuring coursevideos is initialized
    setCourseData((prevData) => ({
      ...prevData,
      coursevideos: prevData.coursevideos
        ? [...prevData.coursevideos, ...videoData]
        : videoData,
    }));
  };

  const handleNextImagesbtn = async (event) => {
    event.preventDefault();
    if (!courseData.courseimg || !courseData.coursevideos.length === 0) {
      toast.error("Please enter all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("coursecode", courseData.coursecode);
    formData.append("courseimg", courseData.courseimg);

    for (let i = 0; i < courseData.coursevideos.length; i++) {
      formData.append(`videotitle${i + 1}`, courseData.coursevideos[i].name);
      formData.append(`coursevideos`, courseData.coursevideos[i].file);
    }
    try {
      const response = await axios.post("/api/v1/courses/coursedata", formData);
      if (response.data) {
        toast.success("Course created successfully");
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.error("An error occurred while creating the course");
      console.error(error);
    }
    navigate("/admin-dashboard");
  };
  return (
    <>
      <AdminHeader />
      <div className="addmediacontainer">
        <div className="addmediarow">
          <div className="addmediacolumn">
            <h3 className="addmediatitle">Add Media and Images</h3>
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
          </div>
        </div>
        <form className="imagemediaforms">
          <div className="imagecontainer">
            <div className="file-upload">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label htmlFor="image" className="file-upload-button">
                Upload Thumbnail Image
              </label>
            </div>
            {courseData.courseimg && (
              <img
                src={URL.createObjectURL(courseData.courseimg)}
                alt="Selected"
                className="preview-image"
              />
            )}
          </div>
          <div className="videocontainer">
            <input
              type="file"
              id="video"
              accept="video/*"
              multiple
              onChange={handleVideoUpload}
            />
            <label htmlFor="video" className="video-upload-button">
              Upload Videos
            </label>
          </div>

          {courseData.coursevideos.length > 0 && (
            <div className="video-preview">
              {courseData.coursevideos.map((video, index) => (
                <div key={index} className="video-item">
                  <video className="preview-video" controls>
                    <source src={URL.createObjectURL(video.file)} />
                  </video>
                  <span className="video-title">{video.name}</span>
                </div>
              ))}
            </div>
          )}
          <div className="addmediaimagesbtncontainer">
            <button
              type="submit"
              className="addimagesnextbtn"
              onClick={handleNextImagesbtn}
            >
              Create Course
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
};

export default MediaAndImages;
