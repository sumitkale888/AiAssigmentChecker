import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../../shared/hooks/UseFetch";
import useUploadFetch from "../../../../shared/hooks/useUploadFecth";

// Placeholder for User icon
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

// Placeholder for file icon based on type (simplified)
const FileIcon = ({ fileName }: { fileName: string }) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  let iconPath = ''; // This would typically be a more robust icon mapping

  if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
    iconPath = 'https://placehold.co/40x40/e0e0e0/333333?text=IMG'; // Generic image icon placeholder
  } else if (extension === 'docx' || extension === 'doc') {
    iconPath = 'https://placehold.co/40x40/e0e0e0/333333?text=DOC'; // Generic document icon placeholder
  } else {
    iconPath = 'https://placehold.co/40x40/e0e0e0/333333?text=FILE'; // Generic file icon placeholder
  }

  return <img src={iconPath} alt="file icon" className="w-10 h-10 rounded-md object-cover" />;
};


const SubmissionUpload: React.FC = () => {
  const navigate = useNavigate();
  const { assignment_id, class_id } = useParams();
  const [files, setFiles] = useState<FileList | null>(null);

  // Fetch existing submissions for the assignment
  const {
    data: dataSubmission,
    refetch
  } = useFetch({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/student/class/assignment/${assignment_id}/submissions`
  });

  // Hook for handling file uploads
  const { execute,  status, error } = useUploadFetch();

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  // Handle file upload submission
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    await execute(
      `${import.meta.env.VITE_BACKEND_URL}/student/class/assignment/${assignment_id}/submissions`,
      'POST',
      formData,
    );
    refetch(); // Refetch submissions after upload
  };

  // Handle unsubmit action (placeholder for actual API call)
  const handleUnsubmit = () => {
    // Implement unsubmission logic here, likely another API call
    console.log("Unsubmit clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans w-165">
      <div className="max-w-md mx-auto bg-white rounded-[30px] shadow-md overflow-hidden p-6 w-500">
        {/* Your Work Section */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 mb-6 ">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Your work</h3>
            <span className="text-sm text-gray-500">Turned in</span>
          </div>

          {Array.isArray(dataSubmission) && dataSubmission.length > 0 ? (
            dataSubmission.map((submission: any) => (
              <div key={submission.submission_id} className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer mb-2">
                <FileIcon fileName={submission.file_original_name} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {submission.file_original_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {submission.file_original_name.split('.').pop()?.toUpperCase()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">No files submitted yet.</div>
          )}

          <button
            onClick={handleUnsubmit}
            className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Unsubmit
          </button>
        </div>

        {/* File Upload Form */}
        <form className="w-full" onSubmit={handleUpload} encType="multipart/form-data">
          <div className="mt-4">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload New Files:
            </label>
            <input
              id="file-upload"
              type="file"
              name="files"
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

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {status === 'loading' ? 'Uploading...' : 'Upload Files'}
          </button>

          {status === 'error' && <p className="text-red-500 mt-2">Error: {error?.message}</p>}
          {status === 'success' && <p className="text-green-500 mt-2">Success: Files uploaded!</p>}
        </form>

        {/* Private Comments Section */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Private comments</h3>
          <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors cursor-pointer">
            <UserIcon />
            <button>Add comment to Preeti Kulkarni</button>
          </div>
        </div>

        {/* Submit Button (outside the form if it's for the overall submission) */}
        <div className="mt-6 text-center">
          <button
            onClick={() => { navigate(`/student/class/${class_id}`) }}
            className="bg-green-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors text-lg font-semibold"
          >
            Submit Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionUpload;
