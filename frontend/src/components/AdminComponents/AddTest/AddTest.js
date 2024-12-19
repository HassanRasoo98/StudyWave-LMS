import React, { useState, useEffect } from 'react';
import './AddTest.css';
import AdminHeader from '../DashboardComponents/AdminHeader.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate,useLocation  } from 'react-router-dom'

const AddTest = () => {
  const [data3, setData3] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState('5');
  const [Subject, setSubject] = useState('');
  const [Level, setLevel] = useState('');
  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const handleTotalQuestions = (e)=>{
    setTotalQuestions(e.target.value);
  }
  const handleSubjectSetting = (e)=>{
    setSubject(e.target.value);
  }
  const handleSetLevel = (e)=>{
    setLevel(e.target.value);
  }
  
  const GetSubjects = async () => {
    try {
      const response = await axios.get('/api/v1/auth/getallSubjects');
      setData3(response.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSubjects();
  }, []);
  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: '',
      options: ['', '', '', ''],
      answer: -1, // Index of the correct option
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleOptionChange = (questionIndex, optionIndex, text) => {
    const newQuestions = [...questions];
    if (optionIndex === -1) {
      newQuestions[questionIndex].questionText = text;
    } else {
      newQuestions[questionIndex].options[optionIndex] = text;
    }
    setQuestions(newQuestions);
  };
  
  

  const handleAnswerChange = (questionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answer = parseInt(e.target.value, 10);
    setQuestions(newQuestions);
  };
  const savetest = async(e)=>{
    e.preventDefault();
    try{
      const test = {
        totalQuestions,
        Subject: Subject,
        Level: Level,
        questions,
      };
          const response = await axios.post('/api/v1/basetest/createtest',test)
          if (response.data.success) {
            toast.success('Test created successfully');
            window.location.reload()
          } else {
            toast.error('Failed to create the test');
          }
    }catch(error)
    {
      console.log(error)
      toast.error("Something Went Wrong")
    }
  }
  return (
    <>
      <AdminHeader />
      <div className="addtestcontainer">
        <div className="addtestrow">
          <div className="addtestcolumn">
            <h3 className="addtesttitle">Add New Test</h3>
            <form className="addtestform">
              <div className="addtestdiv" >
                <label htmlFor="coursename" className="addtestform-label">
                  Total Questions
                </label>
                <input
                  type="text"
                  id="coursename"
                  className="addtestform-input"
                  placeholder="5"
                  name="totalQuestions"
                  value={totalQuestions.totalQuestions}
                  onChange={handleTotalQuestions}
                  readOnly
                />
              </div>
              <div className="addtestdiv">
                <label htmlFor="testsubject" className="addtestform-label">
                  Select Subject
                </label>
                <select
                  id="testSelection"
                  className="testselect"
                  name="Subject"
                  value={Subject.Subject}
                  onChange={handleSubjectSetting}
                >
                  <option value="" className="courseselectoptions">
                    Choose Options...
                  </option>
                  {Array.isArray(data3) ? (
                    data3.map((Subjects) => (
                      <option
                        key={Subjects._id}
                        value={Subjects.subject_title}
                        className="courseselectoptions"
                      >
                        {Subjects.subject_title}
                      </option>
                    ))
                  ) : (
                    <option value="" className="courseselectoptions">
                      Loading data...
                    </option>
                  )}
                </select>
              </div>
              <div className="addtestdiv">
                <label htmlFor="testsubject" className="addtestform-label">
                  Select Test Level
                </label>
                <select
                  id="testSelection"
                  className="testselect"
                  name="Level"
                  value={Level.Level}
                  onChange={handleSetLevel}
                >
                  <option value="" className="courseselectoptions">
                    Choose Options...
                  </option>
                  <option value="easy" className="courseselectoptions">
                    Easy
                  </option>
                  <option value="medium" className="courseselectoptions">
                    Medium
                  </option>
                  <option value="hard" className="courseselectoptions">
                    Hard
                  </option>
                </select>
              </div>
              <div className='testcontainer'>
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="addtestdiv2">
                  <label className="addtestform-label2">
                    Question {questionIndex + 1}
                  </label>
                  <input
                      type="text"
                      className="addtestform-input2"
                      placeholder="Question Text"
                      value={questions[questionIndex].questionText}
                      onChange={(e) =>
                        handleOptionChange(questionIndex, -1, e.target.value)
                      }
                    />
                  <ul className='testul'>
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex} className='testli'>
                        <input
                          type="text"
                          className="addtestform-input2"
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(questionIndex, optionIndex, e.target.value)
                          }
                        />
                        <input
                          type="radio"
                          name={`correctOption${questionIndex}`}
                          value={optionIndex}
                          checked={question.answer === optionIndex}
                          className='correctoptionradio'
                          onChange={(e) =>
                            handleAnswerChange(questionIndex, e)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                type="button"
                className="addtestbtn2"
                onClick={handleAddQuestion}
              >
                Add Question
              </button>
              </div>
              <div className="addtestbtncontainer">
                <button type="submit" className="addtestbtn" onClick={savetest}>
                  Save Test
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTest;
