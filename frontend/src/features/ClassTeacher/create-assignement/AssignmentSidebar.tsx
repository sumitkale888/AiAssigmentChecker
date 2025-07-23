import { useDispatch,useSelector } from "react-redux";
import React, { useState } from 'react';
import { updateAssignmentCreateStatus } from '../../../shared/slices/sharedSlice';

const AssignmentSidebar = () => {
    const dispatch = useDispatch();
    const assignmentCreateStatus = useSelector((state: any) => state.shared.assignmentCreateStatus);
    const [evaluationGuideline, setEvaluationGuideline] = useState<string>('');
    const [points, setPoints] = useState<number>(0);

    return (
        <div className="w-1/4 p-4 bg-gray-100 h-screen">
            <form >
                <div>
                    <input 
                    type="integer" 
                    placeholder="Grad" 
                    onChange={(e)=>{
                        setPoints(parseInt(e.target.value));
                        dispatch(updateAssignmentCreateStatus({
                            title:assignmentCreateStatus.title,
                            description:assignmentCreateStatus.description,
                            evaluation_guideline:assignmentCreateStatus.evaluation_guideline, 
                            points: parseInt(e.target.value) 
                        }));

                    }}/>
                </div>
                <div>
                    <textarea 
                    name="evaluation_guideline" 
                    id="" 
                    placeholder="evaluation_guideline" 
                    className="w-full h-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange= {
                        (e) => {
                            setEvaluationGuideline(e.target.value);
                            dispatch(updateAssignmentCreateStatus({ 
                                evaluation_guideline: e.target.value,
                                title: assignmentCreateStatus.title,
                                description: assignmentCreateStatus.description,
                                points: assignmentCreateStatus.points,
                            }));
                        }
                    }
                    />
                </div>

            </form>

        </div>
    );
}

export default AssignmentSidebar;