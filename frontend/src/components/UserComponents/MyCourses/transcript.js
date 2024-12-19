import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('https://a33e-115-186-57-250.ngrok-free.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setOutput(response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {output && (
        <div>
          <h2>Output:</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
