import React, { useState, useEffect } from 'react'
import AdminHeader from '../DashboardComponents/AdminHeader.js'
import './TestList.css'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import {NavLink,useNavigate,useLocation  } from 'react-router-dom';

const TestList = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
const navigate = useNavigate();
  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await axios.get('/api/v1/basetest/getallquiz'); // Adjust the API endpoint as needed
        setQuizData(response.data.Quiz);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuizData();
  }, []);
  const handleDelete = async (quizId) => {
    try {
      const response = await axios.delete(`/api/v1/basetest/deletequiz/${quizId}`);
      if (response.data.success) {
        // Remove the deleted quiz from the list
        setQuizData((prevData) => prevData.filter((quiz) => quiz._id !== quizId));
      } else {
        console.error('Delete quiz request was not successful.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleupdate = async(quizId)=>{
    navigate(`/admin-dashboard/update-test/${quizId}`)
  }
  return <>
  <AdminHeader/>
  <div className="quiz-list-container">
      <h1 className="quiz-list-title">Quiz List</h1>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <ul className="quiz-items">
          <li className="quiz-item">
              <span className="quiz-name2">Questions</span> -{' '}
              <span className="quiz-name2">Subject</span> -{' '}
              <span className="quiz-name2">Level</span> -{' '}
              <span className='quiz-name2'>View</span>
              <span className='quiz-name2'>Edit</span>
              <span className='quiz-name2'>Delete</span>
            </li>
          {quizData.map((quiz) => (
            <li key={quiz._id} className="quiz-item">
              <span className="quiz-name">{quiz.totalQuestions}</span> -{' '}
              <span className="quiz-name">{quiz.Subject}</span> -{' '}
              <span className="quiz-name">{quiz.Level}</span> -{' '}
              <span className='quiz-name'><NavLink to={`/admin-dashboard/test-list/${quiz._id}`}><FaEye className='listeye-icon'/></NavLink></span>
              <span className='quiz-name'><FaEdit className='editeye-icon' onClick={()=> handleupdate(quiz._id)}/></span>
              <span className='quiz-name'><FaTrash className='deleteeye-icon' onClick={() => handleDelete(quiz._id)}/></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </>
}

export default TestList