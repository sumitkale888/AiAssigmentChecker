import useFetch from "../../../../shared/hooks/UseFetch";
import { useParams } from "react-router-dom";

const ContentAssignment: React.FC = () => {
  const { assignment_id } = useParams();

  const { data: dataAssignmentAttachment } = useFetch({
    method: "GET",
    url: `http://localhost:3000/api/student/class/assignment/attachment/${assignment_id}`,
  });

  const { data: dataAssignment } = useFetch({
    method: "GET",
    url: `http://localhost:3000/api/student/class/assignment/${assignment_id}`,
  });

  return (
    <div className="bg-white p-6 rounded-xl w-full max-w-3xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Assignment Details</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">Title</h3>
          <p className="text-gray-600">{dataAssignment?.title || "No title available"}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">Description</h3>
          <p className="text-gray-600">{dataAssignment?.description || "No description"}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentAssignment;
