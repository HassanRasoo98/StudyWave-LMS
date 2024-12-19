import React, { useState, useEffect } from "react";
import "./ProfileComplete.css";
import Header from "../HomePage/Header/Header";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const ProfileComplete = () => {
  const { email, password, name } = useParams();
  const Location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    location: "",
    phone: "",
    bio: "",
    email: email,
  });

  const { age, location, phone, bio } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [showMessage, setShowMessage] = useState(false);

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the form data to check if it's correctly captured
      console.log(formData);

      const response = await axios.post("/api/v1/auth/profile", formData);
      if (response.data.success) {
        console.log("Successfully Updated");
      }
      setShowMessage(true);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate(`/test/${email}`);

        // Handle success
      } else {
        toast.error(response.data.message);
        console.log("Something Went Wrong in Profile response");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 10000);
    }
  }, [showMessage]);
  // const handleTest = ()=>{
  //   navigate(`/test/${email}`)
  // }
  return (
    <>
      <Header />
      <div className="profilecompletecontainer">
        <div className="profilecomplete-shape">
          <h3 className="profilecompletetitle">Complete your Profile</h3>
        </div>
        <form className="profilecompleteform" onSubmit={handleSubmit}>
          <div className="profilecontainer">
            <label className="profilecompletelabel">Email</label>
            <input
              type="email"
              id="email"
              className="profilecompleteinput"
              value={email}
              readOnly
            />
          </div>
          <div className="profilecontainer">
            <label className="profilecompletelabel">Username</label>
            <input
              type="text"
              id="fullName"
              className="profilecompleteinput"
              value={name}
              readOnly
            />
          </div>
          <div className="profilecontainer">
            <label className="profilecompletelabel">Password</label>
            <input
              type="password"
              id="password"
              className="profilecompleteinput"
              value={password}
              readOnly
            />
          </div>
          <div className="profilecontainer">
            <label className="profilecompletelabel">Phone Number</label>
            <input
              type="number"
              id="mobileNumber"
              name="phone"
              className="profilecompleteinput"
              value={phone}
              onChange={handleChange}
            />
          </div>
          <div className="profilecontainer">
            <label className="profilecompletelabel">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              className="profilecompleteinput"
              value={age}
              onChange={handleChange}
            />
          </div>
          <div className="profilecontainer">
            <label className="profilecompletelabel">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              className="profilecompleteinput"
              value={location}
              onChange={handleChange}
            />
          </div>
          <div className="profilecontainer">
            <label className="profilecompletelabel">Bio</label>
            <textarea
              id="bio"
              name="bio"
              className="profilecompletetextarea"
              value={bio}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="profilecompletebtn">
            <button type="submit" className="profilebtn">
              Attempt Base Test
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
      <div className="commonheading">
        <div className="CTAimage">
          <img
            src="https://faculty.spagreen.net/demo/public/images/20230813210029image_391x541cta_image16.png"
            alt="CTA image"
          />
        </div>
        <h3 className="commonheadingtxt">Ready to be a part of Learnup</h3>
        <NavLink to="/Signup" className="learnerbtn">
          Sign up here
        </NavLink>
      </div>
    </>
  );
};

export default ProfileComplete;
