// import React, { useState } from 'react';
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateAssignmentUploadHandle } from '../../../shared/slices/sharedSlice'
import useManualFetch from "../../../shared/hooks/useManualFetch";
import { useParams, useNavigate } from 'react-router-dom';

import AssignmentImg from '../../../assets/assignment.svg';

const AssignmentHeader: React.FC<{ class_id: string }> = ({ class_id }) => {

    const { class_id: classId } = useParams<{ classId: string, class_id: string }>();

    const assignmentCreateStatus = useSelector((state: any) => state.shared.assignmentCreateStatus);
    const dispatch = useDispatch();

    const { execute,  error } = useManualFetch();
    if (error) {
        console.error('Error fetching data:', error);
    }

    const navigate = useNavigate();

    const handleAssign = async () => {
  const { title, description, evaluation_guideline, points } = assignmentCreateStatus;
  const payload = {
    title,
    description,
    evaluation_guideline,
    points,
    class_id
  };

  try {
    const response:any = await execute('http://localhost:3000/api/class/assignment', 'POST', payload);
    
    if (!response) {
      console.error('No response returned from assignment creation.');
      return;
    }

    console.log('Assignment created successfully:', response);

    dispatch(updateAssignmentUploadHandle({
      ReadyToUpload: true,
      assignment_id: response.assignment_id
    }));

    navigate(`/teacher/class/${classId}`);
  } catch (err) {
    console.error('Error creating assignment:', err);
  }
};

    return (

        <div className='flex h-[70px] relative  border-b border-gray-200 items-center'>
            <div>
                
            </div>
            <div className='cursor-pointer flex items-center p-4 ml-3'>
              <img src={AssignmentImg} className='w-7 h-7' />
               <h1 className="text-2xl  ml-2">Assignment</h1> 
            </div>
            <div className='absolute  right-5'>
                <button className='bg-blue-500 text-white px-5 py-2 rounded-[3vw] hover:bg-blue-700 cursor-pointer'
                    onClick={handleAssign}
                >
                    Assign
                </button>
            </div>
        </div>
    )
}
export default AssignmentHeader;