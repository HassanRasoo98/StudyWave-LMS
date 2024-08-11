import React from 'react';
import {useNavigate,useLocation } from 'react-router-dom'

const Cancel = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  const movenextpage = ()=>{
    navigate('/user-dashboard')
  }
  return (
    <div className="success-container">
      <div className="success-message">
        <h2 className='successheading'>Payment Unsuccessful</h2>
        <p className='successpara'>Your payment has not been successfully processed.</p>
        <button className='successbtn' onClick={movenextpage}>UserDashboard</button>
      </div>
      <div className="success-image">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgEfW611VtZ98z67zzKY24brZqkaBwfA-mYw&usqp=CAU" alt="Success" className='succesimgtag'/>
      </div>
    </div>
  );
};

export default Cancel;
