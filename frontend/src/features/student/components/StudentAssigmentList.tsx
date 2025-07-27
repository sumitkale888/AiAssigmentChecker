import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Interface for a single assignment object
interface Assignment {
    assignment_id: number;
    created_date: string;
    deadline: string | null;
    evaluation_guideline: string | null;
    title: string;
    description: string;
    points: number;
    class_id: number;
}

// Interface for the props of the AssignmentList component
interface AssignmentListProps {
    assignments: Assignment[];
}

// AssignmentList component to display a list of assignments
const StudentAssigmentList: React.FC<AssignmentListProps> = ({ assignments }) => {
    const {class_id}= useParams()
    const navigate = useNavigate();
    return (
        <div className="space-y-4 p-4  rounded-lg ">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Assignments</h2> */}
            {assignments.length === 0 ? (
                <p className="text-gray-600 text-center py-8 ">No assignments available yet.</p>
            ) : (
                assignments.map((assignment) => (
                    <div
                        key={assignment.assignment_id}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                        onClick={() => navigate(`/student/class/${class_id}/assignment/${assignment.assignment_id}`)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-blue-700">{assignment.title}</h3>
                            {assignment.points > 0 && (
                                <span className="text-lg font-bold text-green-600">{assignment.points} pts</span>
                            )}
                        </div>
                        <p className="text-gray-700 mb-3">{assignment.description}</p>
                        <div className="text-sm text-gray-500 flex justify-between items-center">
                            <span>Created: {new Date(assignment.created_date).toLocaleDateString()}</span>
                            {assignment.deadline ? (
                                <span>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</span>
                            ) : (
                                <span className="text-gray-400">No deadline</span>
                            )}
                        </div>
                        {assignment.evaluation_guideline && (
                            <p className="text-sm text-gray-600 mt-2">
                                <span className="font-medium">Guidelines:</span> {assignment.evaluation_guideline}
                            </p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default StudentAssigmentList