import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateAssignmentUploadHandle } from '../../../shared/slices/sharedSlice'
import useManualFetch from "../../../shared/hooks/useManualFetch";
import { useParams, useNavigate } from 'react-router-dom';

import AssignmentImg from '../../../assets/assigment.svg';

const AssignmentHeader: React.FC<{ class_id: string }> = ({ class_id }) => {

    const { class_id: classId } = useParams<{ classId: string, class_id: string }>();

    const assignmentCreateStatus = useSelector((state: any) => state.shared.assignmentCreateStatus);
    const dispatch = useDispatch();

    const { execute, data, status, error } = useManualFetch();

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
    const response = await execute('http://localhost:3000/api/class/assignment', 'POST', payload);
    
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

        <div className='flex h-[50px] relative shadow-[0_4px_2px_-2px_rgba(0,0,0,0.3)] items-center'>
            <div>
                <img src={AssignmentImg} className='w-[35px]' />
            </div>
            <div className='cursor-pointer '>
                Assignment
            </div>
            <div className='absolute  right-5'>
                <button className='bg-[#67abf0] text-white px-4 py-2 rounded-md hover:bg-[#5591d6] cursor-pointer'
                    onClick={handleAssign}
                >
                    Assign
                </button>
            </div>
        </div>
    )
}
export default AssignmentHeader;