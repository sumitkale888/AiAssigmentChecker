import useFetch from "../../../../shared/hooks/UseFetch";
import { useParams } from "react-router-dom";
import useUploadFetch from "../../../../shared/hooks/useUploadFecth";
import React, { useState } from "react";

const SubmissionUpload: React.FC = () => {
    const { assignment_id } = useParams()
    const [files, setFiles] = useState<FileList | null>(null);
    const {
        data: dataSubmission,
        error: errorSubmission,
        status: statusSubmission } = useFetch({
            method: "GET",
            url: `http://localhost:3000/api/student/class/assignment/${assignment_id}/submissions`
        });

    const { execute, data, status, error } = useUploadFetch();
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


        await execute(
            `http://localhost:3000/api/student/class/assignment/${assignment_id}/submissions`,
            'POST',
            formData,
        );
    };


    return (
        <div>
            <div>
                submission Display
                {JSON.stringify(dataSubmission)}
            </div>
              <form className='w-full max-w-lg' onSubmit={handleUpload}>
     
             
      
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

    )
}

export default SubmissionUpload; 