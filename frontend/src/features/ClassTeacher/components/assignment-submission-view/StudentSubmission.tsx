import React from 'react';
import useFetch from '../../../../shared/hooks/UseFetch';
import { useNavigate } from 'react-router-dom';

interface Assignment {
  assignment_id: number;
  title: string;
  dueDate: string | null;
  description: string;
  points: number | null;
  class_name: string;
  submission_id: number | null; 
  attachmentCount: number;
  hasAttachment: boolean;
  status: string;
}

const StudentSubmission: React.FC<{ class_id: string|undefined; student_id: string |undefined}> = ({ class_id, student_id }) => {
  const navigate = useNavigate();
  const {
    data: assignments,
    error,
    status, 
    refetch,
  } = useFetch<Assignment[]>({
    method: 'GET',

    url: `http://localhost:3000/api/teacher/class/submissions/${class_id}/student/${student_id}`,
  });
  
    const {
    data: studentData,
    error: studentError,
    status: studentStatus,
    refetch: studentRefetch,
  } = useFetch<Assignment[]>({
    method: 'GET',
    // --- IMPORTANT: Replace with your actual backend API endpoint ---
    url: `http://localhost:3000/api/teacher/student/${student_id}`,
  });

  const isLoading = studentStatus === 'loading' || studentStatus === 'idle'; // Consider 'idle' as loading initially
  const isError = status === 'error';
  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center">
          <span className="text-white text-3xl font-bold">{studentData?.first_name.charAt(0)}{studentData?.last_name.charAt(0)  }</span>
        </div>
        <h1 className="text-3xl font-semibold text-gray-800">{studentData?.first_name} {studentData?.last_name}</h1>
      </div>

      {/* Dropdown Filter (can be made functional later with useState) */}
      {/* <div className="mb-8">
        <select
          className="block w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
          defaultValue="All"
        >
          <option value="All">All</option>
          <option value="Assigned">Assigned</option>
          <option value="Submitted">Submitted</option>
          <option value="Graded">Graded</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div> */}

      {/* Conditional Rendering based on hook status */}
      {isLoading && <p className="text-center text-gray-600 text-lg">Loading assignments...</p>}
      {isError && (
        <p className="text-center text-red-600 text-lg">
          Error: {error?.message || 'Failed to load assignments.'}
          <button onClick={refetch} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Retry</button>
        </p>
      )}

      {isSuccess && (!assignments || assignments.length === 0) && (
        <p className="text-center text-gray-600 text-lg">No assignments found for this student.</p>
      )}

      {isSuccess && assignments && assignments.length > 0 && (
        <div className="space-y-6">
          {assignments.map((assignment) => (
            <div
              key={assignment.assignment_id} // Unique key is important for list rendering
              className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0  cursor-pointer hover:bg-gray-50 transition duration-200"
              onClick={() => {navigate(`/teacher/student/${student_id}/submission/${assignment.submission_id}`)}}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-medium text-gray-900">{assignment.title}</span>
                  {assignment.hasAttachment && (
                    <span className="text-gray-500 flex items-center">
                      {/* Paperclip icon (SVG) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m7 0V5a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
                        />
                      </svg>
                      {assignment.attachmentCount || ''}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm">
                  {assignment.dueDate
                    ? new Date(assignment.dueDate).toLocaleDateString() // Format date for display
                    : 'No due date'}
                </p>
              </div>
              <div className="text-gray-700 font-semibold">
                {assignment.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSubmission;