import useFetch from "../../../../shared/hooks/UseFetch";
import { useParams, useNavigate } from "react-router-dom";
import useUploadFetch from "../../../../shared/hooks/useUploadFecth";
import React, { useState } from "react";

const SubmissionUpload: React.FC = () => {
  const navigate = useNavigate();
    const { assignment_id,class_id } = useParams()
  const [files, setFiles] = useState<FileList | null>(null);
const {
  data: dataSubmission,
  error: errorSubmission,
  refetch,
} = useFetch(
  `http://localhost:3000/api/student/class/assignment/${assignment_id}/submissions`
);

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
        refetch()

  };


  return (
              <div>
            <div>
                submission Display
                {JSON.stringify(dataSubmission)}
            </div>
              <form className='w-full max-w-lg' onSubmit={handleUpload} encType="multipart/form-data">



                <div className="mt-4">
                  <input type="file" name="files" multiple onChange={handleFileChange} />
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

              <div>
                <button onClick={()=>{navigate(`/student/class/${class_id}`)}}>
          Submit
        </button>
      </div>
        </div>

    )
}

export default SubmissionUpload;
