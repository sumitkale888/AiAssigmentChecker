import React from 'react';
// import AssignmentList from '../../ClassTeacher/components/AssignmentList';
// import StudentAssigmentList from './StudentAssigmentList';
import AssignmentPost from './AssigmentPost';
import useFetch from '../../../shared/hooks/UseFetch';
import { useNavigate } from 'react-router-dom';
import CircularLoader from '../../../shared/components/loaders/CircularLoader';
const StudentSectionContent: React.FC<{ class_id: string | undefined }> = ({ class_id }) => {

    const navigate = useNavigate();
    const { data,status } = useFetch<any>({ method: "GET", url: `${import.meta.env.VITE_BACKEND_URL}/student/class/assignments/${class_id}` })
    const { data: classData} = useFetch<any>({ method: "GET", url: `${import.meta.env.VITE_BACKEND_URL}/student/class/${class_id}` })

    return (
        <div className="bg-white rounded-xl  overflow-hidden border border-gray-200 w-6xl ml-[15px] h-120">

            {/* Class Banner */}
            <div className="relative h-48 bg-blue-600 flex items-end justify-between p-6 rounded-t-lg"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-t-lg"></div>
                {/* <h1 className="text-white text-3xl font-bold relative z-10">{classInfo.class_name}</h1> */}
                <div className='text-white font-semibold text-4xl'>{classData && classData.class_name}</div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row p-6 ">
                {/* Left Sidebar */}
                <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">


                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="text-gray-700 font-semibold mb-2">Upcoming</h3>
                        <p className="text-gray-500 text-sm mb-4">No work due soon</p>
                        <button className="text-blue-600 hover:underline text-sm font-medium">View all</button>
                    </div>
                </div>

                    {/* Main Stream Content */}
                <div className="w-full md:w-2/3">
                    <div>
                        {

                        }
                        {data && data.length > 0 ? (
                            data.map((assignment: any) => (
                                <div className='mb-4 cursor-pointer' key={assignment.assignment_id} onClick={() => navigate(`/student/class/${class_id}/assignment/${assignment.assignment_id}`)}>
                                    <AssignmentPost key={assignment.assignment_id} assignment={assignment} />
                                </div>
                            ))
                        ) : (
                                                       <div className='text-center text-gray-500 '>
                                {status === 'loading' ? <div className='mt-[50px] ml-[50px]'><CircularLoader /> </div>: 'No assignments available.'}
                            </div>
                        )}
                    </div>
                    {/* 
                    <div >
                        {data && <StudentAssigmentList assignments={data} />}
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default StudentSectionContent;