import React from 'react';
import './Success.css'
import {useNavigate,useLocation } from 'react-router-dom'

const Success = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  const movenextpage = ()=>{
    navigate('/user-dashboard/mycourses')
  }
  
  return (
    <div className="success-container">
      <div className="success-message">
        <h2 className='successheading'>Payment Successful</h2>
        <p className='successpara'>Your payment has been successfully processed.</p>
        <p className='successpara2'>Thank you for your purchase!</p>
        <button className='successbtn' onClick={movenextpage}>See My Courses</button>
      </div>
      <div className="success-image">
        <img src="https://openjournalsystems.com/wp-content/uploads/2017/07/payment-success.png" alt="Success" className='succesimgtag'/>
      </div>
    </div>
  );
};

export default Success;
