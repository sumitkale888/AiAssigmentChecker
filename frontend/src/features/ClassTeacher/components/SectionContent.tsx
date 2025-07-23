import React from 'react';
import AssignmentPost from "./AssigmentPost"
// Main App component
// const App = () => {
//     // Sample class data
//     const classData = {
//         class_id: 2,
//         class_name: "Mathematics 101",
//         section: "A",
//         subject: "Mathematics",
//         room: "Room 12",
//         description: "Basic algebra and geometry for beginners.",
//         joining_code: "yqajjhv8",
//         uploaded_photo_url: "https://placehold.co/1200x200/4F46E5/ffffff?text=Class+Banner", // Using a placeholder for the image
//         teacher_id: 7
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
//             <ClassCard classInfo={classData} />
//         </div>
//     );
// };

// ClassCard component to display class information
interface SectionContent {
    class_id: number;
    class_name: string;
    section: string;
    subject: string;
    room: string;
    description: string;
    joining_code: string;
    uploaded_photo_url: string;
    teacher_id: number;
}

const SectionContent: React.FC<{ classInfo: SectionContent }> = ({ classInfo }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full max-w-4xl ml-[15px]">

            {/* Class Banner */}
            <div className="relative h-48 bg-blue-600 flex items-end justify-between p-6 rounded-t-lg"
                 >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-t-lg"></div>
                {/* <h1 className="text-white text-3xl font-bold relative z-10">{classInfo.class_name}</h1> */}
                <button className="bg-white text-blue-700 px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                    Customize
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row p-6">
                {/* Left Sidebar */}
                <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-700 font-semibold">Class code</h3>
                            <button className="text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0H6" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-blue-600 text-lg font-mono tracking-wider">
                                {classInfo.joining_code}
                                </span>
                            <button className="ml-2 text-gray-500 hover:text-blue-600"
                                    onClick={() => {
                                        // Copy to clipboard functionality
                                        const el = document.createElement('textarea');
                                        el.value = classInfo.joining_code;
                                        document.body.appendChild(el);
                                        el.select();
                                        document.execCommand('copy');
                                        document.body.removeChild(el);
                                        // In a real app, you might show a small tooltip or message here
                                        console.log('Joining code copied!');
                                    }}
                                    >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                </svg>
                            </button>
                        </div>
                    </div>

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

                    {/* Assignment Posts */}
                    <div className="space-y-4">
                        <AssignmentPost
                            author="partha kadam"
                            assignmentName="fgf"
                            date="Jul 20"
                        />
                        <AssignmentPost
                            author="partha kadam"
                            assignmentName="bbfgb"
                            date="Jul 20"
                        />
                        {/* You can add more AssignmentPost components here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

// AssignmentPost component for individual assignment entries
// const AssignmentPost = ({ author, assignmentName, date }) => {
//     return (
//         <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-200">
//             <div className="flex items-center">
//                 <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full mr-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                 </div>
//                 <div>
//                     <p className="text-gray-800">
//                         <span className="font-semibold">{author}</span> posted a new assignment: <span className="font-medium">{assignmentName}</span>
//                     </p>
//                     <p className="text-gray-500 text-sm">{date}</p>
//                 </div>
//             </div>
//             <button className="text-gray-500 hover:text-gray-700">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                 </svg>
//             </button>
//         </div>
//     );
// };

export default SectionContent;
