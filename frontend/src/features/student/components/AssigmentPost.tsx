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
// interface AssignmentListProps {
//     assignments: Assignment[];
// }

// AssignmentPost component for individual assignment entries
const AssignmentPost:React.FC<{assignment: Assignment}> = ({assignment}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-200">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-gray-800">
                        <span className="font-semibold">Teacher</span> posted a new assignment: <span className="font-medium">{assignment.title}</span>
                    </p>
                    <p className="text-gray-500 text-sm">{assignment.created_date}</p>
                </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </button>
        </div>
    );
};

export default AssignmentPost;