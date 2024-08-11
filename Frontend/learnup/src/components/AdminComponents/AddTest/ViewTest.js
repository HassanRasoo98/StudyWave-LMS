import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewTest.css';
import AdminHeader from '../DashboardComponents/AdminHeader';

const ViewTest = () => {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`/api/v1/basetest/gettest/${id}`);
        setQuiz(response.data.quiz);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchQuiz();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!quiz) {
    return <p>Quiz not found</p>;
  }

  return (
    <>
      <AdminHeader />
      <div className="quiz-container">
        <h1 className="quiz-title">{quiz.title}</h1>
        <p className="quiz-info">
          <strong>Level:</strong> {quiz.Level} | <strong>Subject:</strong> {quiz.Subject}
        </p>
        <p className="quiz-info">
          <strong>Total Questions:</strong> {quiz.totalQuestions} | <strong>Created At:</strong> {quiz.createdAt}
        </p>

        <h2 className="questions-title">Questions</h2>
        <ul className="questions-list">
          {quiz.questions.map((question, index) => (
            <li key={question._id} className="question-item">
              <p className="question-text">{question.questionText}</p>
              <ul className="options">
                {question.options.map((option, optionIndex) => (
                  <li key={option._id} className="option">
                    <input type="radio" name={`question-${index}`} checked={optionIndex === question.answer} readOnly />
                    <label>
                      {optionIndex === question.answer ? ' ' : ''}{option}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ViewTest;
