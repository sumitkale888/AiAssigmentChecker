import React, { useState } from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { updateAssignmentCreateStatus } from '../../../shared/slices/sharedSlice';

const AssignmentForm: React.FC = () => {
  const dispatch = useDispatch();
  const assignmentCreateStatus = useSelector((state: any) => state.shared.assignmentCreateStatus);

  const [files, setFiles] = useState<FileList | null>(null);

  const [title, setTitle] = useState<String | null>('');
  const [description, setDescription] = useState<String | null>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };
  const handleUpload = async () => {
    if (!files) return;
    console.log('Uploading files:', files);
    const formData = new FormData();

    // Append each file
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });




    try {
      const res = await axios.post('http://localhost:3000/api/class/assignmentAttachments/2', formData, {
        // credentials: 'include',
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className='flex flex-col items-center justify-center mt-10'>
        <form className='w-full max-w-lg'>
          <div className='mb-4'>
            <input
              type='text'
              id='title'
              placeholder='Enter assignment title'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) => {
                setTitle(e.target.value)
                dispatch(updateAssignmentCreateStatus({ title: e.target.value, description: assignmentCreateStatus.description, evaluation_guideline: assignmentCreateStatus.evaluation_guideline, points: assignmentCreateStatus.points }));
              }}
            />
          </div>
          <div>
            <textarea id="description" placeholder="Enter assignment description" className="shadow appearance-none border rounded w-full h-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                setDescription(e.target.value);
                dispatch(updateAssignmentCreateStatus({ title: assignmentCreateStatus.title, description: e.target.value, evaluation_guideline: assignmentCreateStatus.evaluation_guideline, points: assignmentCreateStatus.points }));
              }}
            >

            </textarea>
          </div>

          <div>
            <div>
              <input type="file" multiple onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload Files</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssignmentForm;