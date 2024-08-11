import React, { useEffect, useState } from 'react';
import AdminHeader from '../DashboardComponents/AdminHeader';
import { useParams } from 'react-router-dom';
import './UpdateTest.css';
import axios from 'axios';

const UpdateTest = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState({
    totalQuestions: '',
    Subject: '',
    Level: '',
    questions: [],
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await axios.get(`/api/v1/basetest/gettest/${id}`);
        setQuizData(response.data.quiz);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuizData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/v1/basetest/updatequiz/${id}`, quizData);
      if (response.data.success) {
        setSuccessMessage('Quiz updated successfully');
        window.location.reload();
      } else {
        setErrorMessage('Failed to update quiz');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Internal server error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleQuestionChange = (e, questionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], [name]: value };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].answer = optionIndex;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };
  
  return (
    <>
    <AdminHeader />
    <div className="update-test-container">
      <h1 className="update-test-title">Update Test</h1>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="updateform-group">
            <label htmlFor="totalQuestions" className='fixedupdate'>Total Questions:</label>
            <input
              type="number"
              id="totalQuestions"
              name="totalQuestions"
              value={quizData.totalQuestions}
              onChange={handleChange}
              className='updatetotalquestions'
            />
          </div>
          <div className="updateform-group">
            <label htmlFor="Subject" className='fixedupdate'>Subject:</label>
            <input
              type="text"
              id="Subject"
              name="Subject"
              value={quizData.Subject}
              onChange={handleChange}
              className='updateSubjects'
            />
          </div>
          <div className="updateform-group">
            <label htmlFor="Level" className='fixedupdate'>Level:</label>
            <input
              type="text"
              id="Level"
              name="Level"
              value={quizData.Level}
              onChange={handleChange}
              className='updateLevel'
            />
          </div>
          <h2 className="updatequestions-title">Questions:</h2>
          {quizData.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="updatequestion-item">
              <div className="updateform-group">
                <label htmlFor={`questionText-${questionIndex}`} className='fixedupdate'>Question Text:</label>
                <input
                  type="text"
                  id={`questionText-${questionIndex}`}
                  name="questionText"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(e, questionIndex)}
                  className='updatequestions'
                />
              </div>
              <div className="updateoptions-container">
                <h3 className="updateoptions-title">Options:</h3>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="updateoption-item">
                    <label>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        checked={optionIndex === question.answer}
                        onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                        className='updatcorrecteoptions'
                      />
                    </label>
                    <input
                      type="text"
                      name={`option-${questionIndex}-${optionIndex}`}
                      value={option}
                      onChange={(e) => handleOptionChange(e, questionIndex, optionIndex)}
                      className='updateoptions'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="update-button" onClick={handleUpdate}>
            Update Test
          </button>
        </>
      )}
    </div>
  </>
  );
};

export default UpdateTest;
