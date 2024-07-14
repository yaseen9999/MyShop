// FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log('Selected file:', selectedFile);
  };

  const onClickHandler = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    console.log('form data :', formData);
    try {
      const response = await axios.post('http://localhost:3001/admin', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={onChangeHandler} />
      <button onClick={onClickHandler}>Upload</button>
    </div>
  );
};

export default FileUpload;
