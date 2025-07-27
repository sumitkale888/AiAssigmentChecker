import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssignmentCreateStatus } from '../../../shared/slices/sharedSlice';
import useManualFetch from "../../../shared/hooks/useUploadFecth";
import { useParams } from 'react-router-dom';

const AssignmentForm: React.FC = () => {
  const dispatch = useDispatch();
  const { assignment_id } = useParams();
  const assignmentCreateStatus = useSelector((state: any) => state.shared.assignmentCreateStatus);
  const uploadState = useSelector((state: any) => state.shared.assignmentUploadHandle);

  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [points, setPoints] = useState<string>('100');
  const [dueDate, setDueDate] = useState<string>('');
  const [topic, setTopic] = useState<string>('');

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

    formData.append('title', title);
    formData.append('description', description);
    formData.append('points', points);
    formData.append('dueDate', dueDate);
    formData.append('topic', topic);

    await execute(
      `http://localhost:3000/api/class/assignmentAttachments/${uploadState.assignment_id}`,
      'POST',
      formData,
      true
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
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      
      
      {/* Title Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title<span className="text-red-500">*</span>
          <span className="text-xs text-gray-500 block">*Required</span>
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter assignment title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

      {/* Instructions Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instructions
          <span className="text-xs text-gray-500 block">(optional)</span>
        </label>
        <textarea
          id="description"
          placeholder="Enter assignment instructions"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-32"
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

      {/* File Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Attach Files
          <span className="text-xs text-gray-500 block">(optional)</span>
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Assignment Details Section */}
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="w-24 text-sm font-medium text-gray-700">For</span>
          <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
            <option>All students</option>
          </select>
        </div>

        <div className="flex items-center">
          <span className="w-24 text-sm font-medium text-gray-700">Points</span>
          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="flex items-center">
          <span className="w-24 text-sm font-medium text-gray-700">Due</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="flex items-center">
          <span className="w-24 text-sm font-medium text-gray-700">Topic</span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option>No topic</option>
          </select>
        </div>

        <div className="flex items-center">
          <span className="w-24 text-sm font-medium text-gray-700">Rubric</span>
          <button className="text-blue-500 text-sm flex items-center">
            <span>+ Rubric</span>
          </button>
        </div>
      </div>


      {status === 'error' && <p className="text-red-500 mt-4">Error: {error?.message}</p>}
      {status === 'success' && <p className="text-green-500 mt-4">Success: Assignment created!</p>}
    </div>
  );
};

export default AssignmentForm;