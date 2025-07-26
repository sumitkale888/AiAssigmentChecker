import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssignmentCreateStatus } from '../../../shared/slices/sharedSlice';
import useManualFetch from "../../../shared/hooks/useUploadFecth"
import { useParams } from 'react-router-dom';
const AssignmentForm: React.FC = () => {

  const dispatch = useDispatch();
  const {assignment_id}=useParams()
  const assignmentCreateStatus = useSelector((state: any) => state.shared.assignmentCreateStatus);
  const uploadState = useSelector((state:any)=>state.shared.assignmentUploadHandle)

  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { execute, data, status, error } = useManualFetch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    // Optionally add title and description to FormData
    formData.append('title', title);
    formData.append('description', description);

    await execute(
      `http://localhost:3000/api/class/assignmentAttachments/${uploadState.assignment_id}`,
      'POST',
      formData,
      true // isFormData
    );
    return true 
  };
 useEffect(() => {
  if (uploadState) {
    const upload = async () => {
      await handleUpload(new Event('submit') as unknown as React.FormEvent);
    };
    upload();
  }
}, [uploadState]);

  return (
    <div>
      <div className='flex flex-col items-center justify-center mt-10'>
        <form className='w-full max-w-lg' onSubmit={handleUpload}>
          <div className='mb-4'>
            <input
              type='text'
              id='title'
              placeholder='Enter assignment title'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                dispatch(updateAssignmentCreateStatus({
                  title: e.target.value,
                  description: assignmentCreateStatus.description,
                  evaluation_guideline: assignmentCreateStatus.evaluation_guideline,
                  points: assignmentCreateStatus.points
                }));
              }}
            />
          </div>

          <div>
            <textarea
              id="description"
              placeholder="Enter assignment description"
              className="shadow appearance-none border rounded w-full h-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                dispatch(updateAssignmentCreateStatus({
                  title: assignmentCreateStatus.title,
                  description: e.target.value,
                  evaluation_guideline: assignmentCreateStatus.evaluation_guideline,
                  points: assignmentCreateStatus.points
                }));
              }}
            />
          </div>

          <div className="mt-4">
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {status === 'loading' ? 'Uploading...' : 'Upload Files'}
          </button>

          {status === 'error' && <p className="text-red-500">Error: {error?.message}</p>}
          {status === 'success' && <p className="text-green-500">Success: {JSON.stringify(data)}</p>}
        </form>
      </div>
    </div>
  );
};

export default AssignmentForm;
