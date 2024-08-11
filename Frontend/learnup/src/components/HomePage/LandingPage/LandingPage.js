import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./LandingPage.css";
// import Login from '../../Login/Login'
const LandingPage = () => {
  return (
    <>
      <div className="hero-area">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="hero-content">
                <span className="hero-subtitle">
                  #1 Platform for Online Learning
                </span>
                <h1 className="hero-title">
                  <span>Grow up</span> your skills today!
                </h1>
                <p className="heropara">
                  Learn more Effectivly and Effeciently.{" "}
                </p>
                <ul className="hero-btns">
                  <li>
                    <a href="/login" className="template-btn">
                      Start{" "}
                      <FaLongArrowAltRight className="fa-long-arrow-alt-right" />
                    </a>
                  </li>
                  <li>
                    <a href="/login" className="getstarted">
                      Get Started
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col">
              

              <div className="image-container">
                <img
                  src="https://faculty.spagreen.net/demo/public/images/20230813185446image_240x240header1_hero_image1103.png"
                  alt="Img 1"
                />

                <img
                  src="https://faculty.spagreen.net/demo/public/images/20230813185446image_196x196header1_hero_image2410.png"
                  alt="Img 2"
                />
                <img
                  src="https://faculty.spagreen.net/demo/public/images/20230813185446image_284x284header1_hero_image3294.png"
                  alt="Img 3"
                />
                <img
                  src="https://faculty.spagreen.net/demo/public/images/20230813185446image_212x212header1_hero_image4224.png"
                  alt="Img 4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
