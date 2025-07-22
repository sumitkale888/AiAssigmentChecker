import React, { useState } from 'react';
import axios from 'axios';

const Upload: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files) return;

    const formData = new FormData();

    // Append each file
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await axios.post('http://localhost:3000/api/class/assignmentAttachments/2', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
      alert('Files uploaded!');
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Files</button>
    </div>
  );
};

export default Upload;
