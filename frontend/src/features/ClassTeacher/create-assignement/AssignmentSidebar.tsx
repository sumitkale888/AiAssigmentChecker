import { useDispatch, useSelector } from "react-redux";
import  { useState } from 'react';
import { updateAssignmentCreateStatus } from '../../../shared/slices/sharedSlice';

const AssignmentSidebar = () => {
    const dispatch = useDispatch();
    const assignmentCreateStatus = useSelector((state: any) => state.shared.assignmentCreateStatus);
    const [points, setPoints] = useState<string>('100');
    const [dueDate, setDueDate] = useState<string>('');
    const [topic, setTopic] = useState<string>('No topic');

    return (
        <div className="w-100 p-6 bg-white border-l border-gray-200 h-screen sticky top-0">
            <div className="space-y-6">
                {/* For Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">For</label>
                    <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                        value="All students"
                    >
                        <option>All students</option>
                        <option>Specific students</option>
                    </select>
                </div>

                {/* Points Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Points</label>
                    <input
                        type="number"
                        value={points}
                        onChange={(e) => {
                            setPoints(e.target.value);
                            dispatch(updateAssignmentCreateStatus({
                                ...assignmentCreateStatus,
                                points: e.target.value
                            }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                {/* Due Date Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Due</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                {/* Topic Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Topic</label>
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                    >
                        <option>No topic</option>
                        <option>Topic 1</option>
                        <option>Topic 2</option>
                    </select>
                </div>

               

                {/* Evaluation Guidelines Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Evaluation Guidelines</label>
                    <textarea
                        placeholder="Enter evaluation guidelines"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm h-32"
                        value={assignmentCreateStatus.evaluation_guideline || ''}
                        onChange={(e) => {
                            dispatch(updateAssignmentCreateStatus({
                                ...assignmentCreateStatus,
                                evaluation_guideline: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AssignmentSidebar;