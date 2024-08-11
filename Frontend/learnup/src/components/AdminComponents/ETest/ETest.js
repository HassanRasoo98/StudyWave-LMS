import React, { useState } from 'react';
import AdminHeader from '../DashboardComponents/AdminHeader.js';
import './ETest.css';
import axios from 'axios';

const ETest = () => {
  const [fileName, setFileName] = useState(null);
  const [mcqs, setMcqs] = useState(null);

  // ... (previous code)

// ... (existing code)

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (file && file.type === 'application/pdf') {
    setFileName(file.name);

    const formData = new FormData();
    formData.append('pdf_file', file);
    formData.append('fileName', file.name);

    try {
      const response = await axios.post(`http://localhost:5000/extract-mcqs?fileName=${encodeURIComponent(file.name)}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response);  // Add this line for debugging
      console.log('Response Data:', response.data);  // Add this line for debugging

      if (response.data.mcqs) {
        setMcqs(response.data.mcqs);
      } else {
        console.error('No MCQs found in the response.');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  } else {
    alert('Please choose a valid PDF file.');
  }
};

// ... (rest of the code)


// ... (rest of the code)


  return (
    <>
      <AdminHeader />
      <div className="file-uploader">
        <input
          type="file"
          id="file-input"
          accept=".pdf"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input" className="upload-filebutton">
          Upload PDF File
        </label>
      </div>

    </>
  );
};

export default ETest;
