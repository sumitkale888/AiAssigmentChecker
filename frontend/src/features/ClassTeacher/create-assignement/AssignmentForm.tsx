import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssignmentCreateStatus } from '../../../shared/slices/sharedSlice';
import useManualFetch from "../../../shared/hooks/useUploadFecth";
// import { useParams } from 'react-router-dom';

const AssignmentForm: React.FC = () => {
  const dispatch = useDispatch();
  // const { assignment_id } = useParams();
  const assignmentCreateStatus = useSelector((state: any) => state.shared.assignmentCreateStatus);
  const uploadState = useSelector((state: any) => state.shared.assignmentUploadHandle);

  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { execute, status, error } = useManualFetch();

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

    formData.append('title', title);
    formData.append('description', description);
    formData.append('points', assignmentCreateStatus.points.toString());
    formData.append('evaluation_guideline', assignmentCreateStatus.evaluation_guideline || '');

    await execute(
      `${import.meta.env.VITE_BACKEND_URL}/class/assignmentAttachments/${uploadState.assignment_id}`,
      'POST',
      formData,
      // true
    );
    return true;
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
    <div className="flex-1 p-6 bg-gray-100 "> {/* Changed to bg-gray-50 for a light gray background */}
      <div className="w-230 mx-auto bg-white p-6 rounded-lg shadow-sm mt-20 "> {/* Added white container with shadow */}
        
        
        {/* Title Section */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            
            
          </div>
          <input
            type="text*"
            id="title"
            placeholder="Title"
            className="w-full px-3 py-2  rounded-md border-1 border-b-gray-500 border-amber-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
              dispatch(updateAssignmentCreateStatus({
                ...assignmentCreateStatus,
                title: e.target.value
              }));
            }}
          />
          <span className="text-xs text-gray-500">*Required</span>
        </div>

        {/* Instructions Section */}
        <div className="mb-6">
          
          <textarea
            id="description"
            placeholder="Instructions"
            className="w-full px-3 py-2  border-1 border-b-gray-500 border-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px] bg-gray-100"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              dispatch(updateAssignmentCreateStatus({
                ...assignmentCreateStatus,
                description: e.target.value
              }));
            }}
          />
        </div>

        

        {/* File Input */}
        <div className="mb-6">
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        
        {status === 'error' && <p className="text-red-500 mt-4">Error: {error?.message}</p>}
        {status === 'success' && <p className="text-green-500 mt-4">Success: Assignment created!</p>}
      </div>
    </div>
  );
};

export default AssignmentForm;