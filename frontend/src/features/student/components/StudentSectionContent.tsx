import React from 'react';
import AssignmentList from '../../ClassTeacher/components/AssignmentList';
import useFetch from '../../../shared/hooks/UseFetch';
import { useNavigate } from 'react-router-dom';
const StudentSectionContent: React.FC<{class_id:string | undefined}> = ({class_id}) => {
        const { data, error, status } = useFetch<any>({ method: "GET", url: `http://localhost:3000/api/class/assignments/${class_id}` })
    return (
<div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full max-w-4xl ml-[15px]">

            {/* Class Banner */}
            <div className="relative h-48 bg-blue-600 flex items-end justify-between p-6 rounded-t-lg"
                 >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-t-lg"></div>
                {/* <h1 className="text-white text-3xl font-bold relative z-10">{classInfo.class_name}</h1> */}
                     <div>ClassName</div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row p-6">
                {/* Left Sidebar */}
                <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">


                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-gray-700 font-semibold mb-2">Upcoming</h3>
                        <p className="text-gray-500 text-sm mb-4">No work due soon</p>
                        <button className="text-blue-600 hover:underline text-sm font-medium">View all</button>
                    </div>
                </div>

                {/* Main Stream Content */}
                <div className="w-full md:w-2/3">
                    {/* Announce something section */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-full font-bold text-lg mr-4">
                            P
                        </div>
                        <input
                            type="text"
                            placeholder="Announce something to your class"
                            className="flex-grow bg-transparent border-none focus:outline-none text-gray-700"
                        />
                        <button className="text-gray-500 hover:text-gray-700 ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </button>
                    </div>
                    
                    <div >
                    {data && <AssignmentList assignments={data}/>}
                    </div>
                 
                </div>
            </div>
        </div>
    );
};

export default StudentSectionContent;