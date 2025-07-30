import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from "../../../../shared/hooks/UseFetch"; // Assuming this path is correct

// Placeholder for FileText icon
const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
  </svg>
);

// Placeholder for MoreVertical icon
const MoreVerticalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
    <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);

const ContentAssignment: React.FC = () => {
  const { assignment_id } = useParams();

  // Fetch assignment details data
  const { data: dataAssignment } = useFetch({
    method: 'GET',
    url: `${import.meta.env.VITE_BACKEND_URL}/student/class/assignment/${assignment_id}`,
  });

  // Format the assignment creation date
  const formattedDate = dataAssignment?.created_date
    ? new Date(dataAssignment.created_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Left Column: Assignment Details */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <FileTextIcon />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                  {dataAssignment?.title || 'Assignment Title'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Teacher • {formattedDate}
                </p>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <MoreVerticalIcon />
            </button>
          </div>

          {/* Points */}
          <p className="text-lg text-gray-700 mb-6">
            {dataAssignment?.points || 0} points
          </p>

          {/* Description/Instructions */}
          <div className="mb-8">
            <p className="text-base text-gray-700 leading-relaxed">
              {dataAssignment?.description || 'No description provided.'}
            </p>
          </div>

          {/* Class Comments */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Class comments</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              Add a class comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default  ContentAssignment
