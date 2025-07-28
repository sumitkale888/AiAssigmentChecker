import useFetch from "../../../../shared/hooks/UseFetch";
import useUploadFetch from "../../../../shared/hooks/useUploadFecth";
import React, { useState } from "react";

const SubmissionUpload: React.FC = () => {










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
