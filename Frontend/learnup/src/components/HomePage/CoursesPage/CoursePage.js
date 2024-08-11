import React from "react";
import "./CoursePage.css";
import { FaGraduationCap, FaUsers, FaStar } from "react-icons/fa";
const CoursePage = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div className="container2">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="common-heading text-center m-b-40 m-b-sm-25">
              <h3 className="courseheading">Our Top Courses</h3>
              <p className="coursesparagraph">
                We make learning convenient, affordable, and fun!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="course-container">
        <div class="course-item">
          <a href="/" className="course-item-thumb">
            <img
              src="https://faculty.spagreen.net/demo/public/images/20230914222030image_402x248-92.png"
              className="courseimg"
              alt="Course Thumbnail"
            />
          </a>
          <div className="course-item-body">
            <div className="course-item-body-inner">
              <div className="course-item-header">
                <ul className="course-item-info">
                  <li className="rating-review">
                    <span className="total-review">
                      <FaStar className="icon-start" />
                      5.00
                    </span>
                  </li>
                </ul>
              </div>
              <h4 className="title">
                <p className="courseparagraph">Programming Fundamentals</p>
              </h4>
              <ul className="course-item-info2">
                <li>
                  {" "}
                  <FaGraduationCap className="lesson-icon" /> 13 Lessons
                </li>
                <li>
                  <FaUsers className="enroll-icon" /> 1 Enroll
                </li>
              </ul>
            </div>
            <div className="course-item-footer">
              <div className="course-price">R.s 1,000.00</div>
              <ul>
                <li>
                  <a href="/" className="details-btn">
                    Details
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="course-item">
          <a href="/" className="course-item-thumb">
            <img
              src="https://faculty.spagreen.net/demo/public/images/20230816060234image_402x248-425.png"
              className="courseimg"
              alt="Course Thumbnail"
            />
          </a>
          <div className="course-item-body">
            <div className="course-item-body-inner">
              <div className="course-item-header">
                <ul className="course-item-info">
                  <li className="rating-review">
                    <span className="total-review">
                      <FaStar className="icon-start" />
                      5.00
                    </span>
                  </li>
                </ul>
              </div>
              <h4 className="title">
                <p className="courseparagraph">
                  Mathematics with Animated Lessons Official
                </p>
              </h4>
              <ul className="course-item-info2">
                <li>
                  {" "}
                  <FaGraduationCap className="lesson-icon" /> 13 Lessons
                </li>
                <li>
                  <FaUsers className="enroll-icon" /> 1 Enroll
                </li>
              </ul>
            </div>
            <div className="course-item-footer">
              <div className="course-price">R.s 1,000.00</div>
              <ul>
                <li>
                  <a href="/" className="details-btn">
                    Details
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="course-item">
          <a href="/" className="course-item-thumb">
            <img
              src="https://faculty.spagreen.net/demo/public/images/20231015221959image_402x248-167.png"
              className="courseimg"
              alt="Course Thumbnail"
            />
          </a>
          <div className="course-item-body">
            <div className="course-item-body-inner">
              <div className="course-item-header">
                <ul className="course-item-info">
                  <li className="rating-review">
                    <span className="total-review">
                      <FaStar className="icon-start" />
                      3.00
                    </span>
                  </li>
                </ul>
              </div>
              <h4 className="title">
                <p className="courseparagraph">Object Oriented Programming</p>
              </h4>
              <ul className="course-item-info2">
                <li>
                  {" "}
                  <FaGraduationCap className="lesson-icon" /> 13 Lessons
                </li>
                <li>
                  <FaUsers className="enroll-icon" /> 1 Enroll
                </li>
              </ul>
            </div>
            <div className="course-item-footer">
              <div className="course-price">R.s 1,000.00</div>
              <ul>
                <li>
                  <a href="/" className="details-btn">
                    Details
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="course-item">
          <a href="/" className="course-item-thumb">
            <img
              src="https://faculty.spagreen.net/demo/public/images/20230914222030image_402x248-92.png"
              className="courseimg"
              alt="Course Thumbnail"
            />
          </a>
          <div className="course-item-body">
            <div className="course-item-body-inner">
              <div className="course-item-header">
                {/* <ul className="course-category">
                            <li>
                                <a href="/" className='courseLabel'>ECAT</a>
                            </li>
                        </ul> */}
                <ul className="course-item-info">
                  <li className="rating-review">
                    <span className="total-review">
                      <FaStar className="icon-start" />
                      5.00
                    </span>
                  </li>
                </ul>
              </div>
              <h4 className="title">
                <p className="courseparagraph">Java Script</p>
              </h4>
              <ul className="course-item-info2">
                <li>
                  {" "}
                  <FaGraduationCap className="lesson-icon" /> 13 Lessons
                </li>
                <li>
                  <FaUsers className="enroll-icon" /> 1 Enroll
                </li>
              </ul>
            </div>
            <div className="course-item-footer">
              <div className="course-price">R.s 1,000.00</div>
              <ul>
                <li>
                  <a href="/" className="details-btn">
                    Details
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="course-item">
          <a href="/" className="course-item-thumb">
            <img
              src="https://faculty.spagreen.net/demo/public/images/20231015221959image_402x248-167.png"
              className="courseimg"
              alt="Course Thumbnail"
            />
          </a>
          <div className="course-item-body">
            <div className="course-item-body-inner">
              <div className="course-item-header">
                {/* <ul className="course-category">
                            <li>
                                <a href="/" className='courseLabel'>MCAT</a>
                            </li>
                        </ul> */}
                <ul className="course-item-info">
                  <li className="rating-review">
                    <span className="total-review">
                      <FaStar className="icon-start" />
                      4.00
                    </span>
                  </li>
                </ul>
              </div>
              <h4 className="title">
                <p className="courseparagraph">Data Structures</p>
              </h4>
              <ul className="course-item-info2">
                <li>
                  {" "}
                  <FaGraduationCap className="lesson-icon" /> 13 Lessons
                </li>
                <li>
                  <FaUsers className="enroll-icon" /> 9 Enroll
                </li>
              </ul>
            </div>
            <div className="course-item-footer">
              <div className="course-price">R.s 4,000.00</div>
              <ul>
                <li>
                  <a href="/" className="details-btn">
                    Details
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="course-item">
          <a href="/" className="course-item-thumb">
            <img
              src="https://faculty.spagreen.net/demo/public/images/20230816060234image_402x248-425.png"
              className="courseimg"
              alt="Course Thumbnail"
            />
          </a>
          <div className="course-item-body">
            <div className="course-item-body-inner">
              <div className="course-item-header">
                <ul className="course-item-info">
                  <li className="rating-review">
                    <span className="total-review">
                      <FaStar className="icon-start" />
                      3.00
                    </span>
                  </li>
                </ul>
              </div>
              <h4 className="title">
                <p className="courseparagraph">Web Development</p>
              </h4>
              <ul className="course-item-info2">
                <li>
                  {" "}
                  <FaGraduationCap className="lesson-icon" /> 14 Lessons
                </li>
                <li>
                  <FaUsers className="enroll-icon" /> 6 Enroll
                </li>
              </ul>
            </div>
            <div className="course-item-footer">
              <div className="course-price">R.s 5,000.00</div>
              <ul>
                <li>
                  <a href="/" className="details-btn">
                    Details
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CoursePage;
