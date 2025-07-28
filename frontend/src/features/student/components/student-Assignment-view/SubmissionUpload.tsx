import wordIcon from "../../../../assets/word-document-svgrepo-com.svg"
import pptIcon from "../../../../assets/powerpoint-svgrepo-com (1).svg"
import pdfIcon from "../../../../assets/pdf-file-svgrepo-com.svg"
import fileIcon from "../../../../assets/file-svgrepo-com.svg"
import useFetch from "../../../../shared/hooks/UseFetch";
import { useParams, useNavigate } from "react-router-dom";
import useUploadFetch from "../../../../shared/hooks/useUploadFecth";
import React, { useState } from "react";

const SubmissionUpload: React.FC = () => {
  const navigate = useNavigate();
  const { assignment_id, class_id } = useParams();
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");

  const getFileTypeLabel = (type: string) => {
    if (type.includes("image")) return "Image";
    if (type.includes("pdf")) return "PDF Document";
    if (type.includes("word")) return "Word Document";
    if (type.includes("presentation")) return "Presentation";
    if (type.includes("spreadsheet")) return "Spreadsheet";
    return "Unknown";
  };

  const {
    data: dataSubmission,
    error: errorSubmission,
    status: statusSubmission,
    refetch
  } = useFetch({
    method: "GET",
    url: `http://localhost:3000/api/student/class/assignment/${assignment_id}/submissions`
  });

  const { execute, data, status, error } = useUploadFetch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // use optional chaining to avoid null error
    if (file) {
      setSelectedFile(file);
    }
  };



  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    await execute(
      `http://localhost:3000/api/student/class/assignment/${assignment_id}/submissions`,
      "POST",
      formData
    );

    if (status !== "error") {
      setUploadSuccess(true);
      refetch();
    }
  };
  return (
    <form onSubmit={handleUpload} className="p-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Upload your file:
      </label>
      <input
        type="file"
        name="files"
        onChange={(e) => {
          handleFileChange(e);
          setFiles(e.target.files); // also update files state
        }}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-blue-700 hover:file:bg-gray-200"
      />

      {selectedFile && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow w-full max-w-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={
                  selectedFile.name.endsWith(".pdf")
                    ? pdfIcon
                    : selectedFile.name.endsWith(".docx") || selectedFile.name.endsWith(".doc")
                      ? wordIcon
                      : selectedFile.name.endsWith(".pptx") || selectedFile.name.endsWith(".pptx")
                        ? pptIcon
                        : fileIcon
                }
                alt="File Icon"
                className="w-12 h-12"
              />
              <div>
                <div className="w-full max-w-[200px] overflow-hidden">
                  <p
                    className="truncate text-sm text-gray-800"
                    title={selectedFile.name} 
                  >
                    {selectedFile.name}
                  </p>
                </div>
                <div>{getFileTypeLabel(selectedFile.type)}</div>
              </div>
            </div>
            <div>
              <button
                className="text-sm text-red-600 hover:underline"
                onClick={() => setSelectedFile(null)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 flex flex-row items-start gap-2">
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {status === 'loading' ? 'Uploading...' : 'Upload Files'}
        </button>
        <button
          onClick={() => {
            navigate(`/student/class/${class_id}`);
          }}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );

}
export default SubmissionUpload;
