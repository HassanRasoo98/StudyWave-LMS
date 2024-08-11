import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserBaseExam.css';
import { useParams,useNavigate,useLocation  } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
const UserBaseExam = () => {
  const { email } = useParams();
  const [showExamReport, setShowExamReport] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(Array(4).fill(null));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isExamDone, setIsExamDone] = useState(false);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const Location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchShuffledQuestions() {
      try {
        const response = await axios.get('/api/v1/test/getshuffled');
        const shuffledQuestions = response.data.questions;
        const correctAnswersArray = shuffledQuestions.map((question) => question.answer);

        setQuestions(shuffledQuestions);
        setCorrectAnswers(correctAnswersArray);
      } catch (error) {
        console.error(error);
      }
    }

    fetchShuffledQuestions();
  }, []);

  const handleOptionSelect = (optionIndex) => {
    if (!isExamDone) {
      const updatedSelectedOptions = [...selectedOptions];
      updatedSelectedOptions[currentQuestionIndex] = optionIndex;

      if (optionIndex === correctAnswers[currentQuestionIndex]) {
        setScore(score + 1);
        setCorrectQuestions([...correctQuestions, currentQuestionIndex]);
      } else {
        setIncorrectQuestions([...incorrectQuestions, currentQuestionIndex]);
      }

      setSelectedOptions(updatedSelectedOptions);
      setIsExamDone(true);

      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setIsExamDone(false);
        }, 1000);
      }
    }
  };

  const calculateScorePercentage = () => {
    if (questions.length === 0) {
      return 0;
    }
    return (score / questions.length) * 100;
  };

  const getScoreLabel = (percentage) => {
    if (percentage < 50) {
      return 'Easy';
    } else if (percentage < 75) {
      return 'Medium';
    } else {
      return 'Hard';
    }
  };

  const handleGoToDashboard = async(e) => {
    e.preventDefault();
    // Handle navigation to the dashboard here
    // You can use React Router or other navigation methods
    try{
      const data = {
        email: email, // or use the email from your state or props
        score: score,
        label: getScoreLabel(calculateScorePercentage())
      };
      const response = await axios.post('/api/v1/auth/updatescoreandlabel',data)
      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/login')
        // Handle success
      } else {
        toast.error(response.data.message)
        console.log("Something Went Wrong in Profile response");
      }

    }catch(error)
    {
      console.log(error);

    }
    
  };

  const handleSubmitExam = () => {
    // Handle the submission of the exam here
    // You can use this function to show the exam report
    // For example:
    setShowExamReport(true);
  };

  return (
    <div className="user-base-exam">
      {showExamReport ? (
        <div className={`exam-report ${showExamReport ? 'visible' : ''}`}>
          <h2 className='examreportitles' >Initial Exam Result</h2>
          <p className="exam-score" name='score' value={`{score} / {questions.length}`}>Score: {score} / {questions.length}</p>
          <p className='scorelabel' name='label' value={`{getScoreLabel(calculateScorePercentage())}`}>Score Label: {getScoreLabel(calculateScorePercentage())}</p>
          <div className='makeincorrect'>
            <h3 className='makeincorrection'>Correct Questions</h3>
            <ul className='makeuserexam-options'>
              {correctQuestions.map((index) => (
                <li key={index} className='makeuserexam-option'>
                  {questions[index].questionText}
                  <div className="correctionofradio">
                  <span className='spanseperation'> Correct Option: {questions[index].options[correctAnswers[index]]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='makeincorrect'>
            <h3 className='makeincorrection'>Incorrect Questions</h3>
            <ul className='makeuserexam-options'>
              {incorrectQuestions.map((index) => (
                <li key={index}  className='makeuserexam-option'>
                  {questions[index].questionText}
                  <div className="correctionofradio">
                    <span className='spanseperation'>Your Option: {questions[index].options[selectedOptions[index]]}</span>
                    <span className='spanseperation'>Correct Option: {questions[index].options[correctAnswers[index]]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button className="go-to-dashboard-button" onClick={handleGoToDashboard}>
            Go to Sign In
          </button>
          <ToastContainer/>
        </div>
      ) : (
        <div className="mcqs-display">
          {currentQuestionIndex < questions.length ? (
            <div className="exam-question">
              <h2 className="exam-question-title">Question {currentQuestionIndex + 1}</h2>
              <p className="exam-question-text">{questions[currentQuestionIndex].questionText}</p>
              <ul className="exam-options">
                {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                  <li key={optionIndex} className="exam-option">
                    <label>
                      <input
                        type="radio"
                        name="options"
                        checked={optionIndex === selectedOptions[currentQuestionIndex]}
                        onChange={() => handleOptionSelect(optionIndex)}
                        className="radio-input"
                        disabled={isExamDone}
                      />
                      <span className="label-text">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mcq-submission">
                <button className="submit-exam-button" onClick={handleSubmitExam}>
                  Submit Exam
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default UserBaseExam;
