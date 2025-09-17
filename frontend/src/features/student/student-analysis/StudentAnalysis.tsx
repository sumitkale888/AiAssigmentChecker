// import React from 'react';
// import Header from '../../../shared/components/header/Header';
// import PageList from '../../../shared/components/sidebar/PageList';
// import { CheckCircle, FileText, Star, BarChart2 } from "lucide-react";
// import {useNavigate} from 'react-router-dom';

// // import UseProtectedPage from '../hooks/UseProtectedPage';
// const StudentAnalysis: React.FC = () => {
//     const navigate = useNavigate();
//     const students = [
//         {
//             name: "Attendance",
//             info: "Some additional information about Attendance.",
//             matrice: { label: "Attendance", value: 85, icon: <CheckCircle size={30} />, bg: "bg-green-500" },
//             route: '/attendance'  
//         },
//         {
//             name: "Assignment",
//             info: "Some additional information about Assignment.",
//             matrice: { label: "Assignment", value: 90, icon: <FileText size={30} />, bg: "bg-blue-500" }, 
//             route: '/assignment'
//         },
//         {
//             name: "Overall Performance",
//             info: "Some additional information about Overall Performance.",
//             matrice: { label: "Performance", value: 95, icon: <Star size={30} />, bg: "bg-yellow-500" },
//             route: '/performance' 
//         },
//         {
//             name: "Progress Report",
//             info: "Some additional information about Progress Report.",
//             matrice: { label: "Progress", value: 80, icon: <BarChart2 size={30} />, bg: "bg-purple-500" },
//             route: '/progress'
//         },
//     ]
//     return (
//         <div>
//             <Header/>
//             <div className='flex'>
//             <PageList />
//             <div className="w-full bg-gray-100 rounded-l-4xl">
//             <h1 className="text-3xl text-gray-900 mt-8 px-10 py-2">Student Analysis Page</h1>

//             <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
//             {students.map((student, index) => (
//               <div
//                 key={index}
//                 onClick={() => student.route && navigate(student.route)}
//                 className="w-72 border bg-white rounded-3xl overflow-hidden cursor-pointer border-gray-300 font-inter shadow-md text-black hover:shadow-lg transition-shadow duration-200"
//               >
//                 <div
//                   className="relative rounded-t-3xl w-full flex flex-col justify-center items-center p-4 bg-cover bg-center bg-teal-500"
//                   style={{ height: "200px", backgroundImage: "none" , borderBottomLeftRadius: "80% 20%",borderBottomRightRadius: "80% 20%", }}
//                 >
//                   <h2 className="text-2xl mb-25 text-black">{student.name}</h2>
//                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40px]">
//                     <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white shadow-lg ${student.matrice.bg}`}>
//                         {student.matrice.icon}
//                     </div>
//                     </div>
//                 </div>

//                 <div className="a h-[60px] flex flex-col justify-center cursor-pointer items-center p-4">
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//     </div>
// </div>
//     );
// };

// export default StudentAnalysis;

import { useState, useEffect } from "react"
import { AssignmentsTable } from "./assignments-table/assignments-table"
import { AttendanceTracker } from "./attendance/attendance-tracker"
import { OverallPerformance } from "./overall-performance/Performance"
import { Leaderboard } from "./leaderboard/leaderboard"

interface ProfileData {
  fullName: string;
  rollNumber: string;
  email: string;
  phone: string;
  dob: string;
  department: string;
  address: string;
  profilePhoto: string;
}

export default function StudentAnalysis() {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "John Doe",
    rollNumber: "CS2024001",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    dob: "2000-01-15",
    department: "Computer Science",
    address: "123 University Street, Campus City, State 12345",
    profilePhoto: "https://randomuser.me/api/portraits/men/46.jpg",
  });

  // Load profile data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("studentProfile");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
  }, []);


  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="w-full rounded-l-4xl bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Analysis</h1>
          <p className="text-gray-600">Track your academic progress and performance insights</p>
        </div>

        {/* Student Profile Header */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-blue-100">
                {profileData.profilePhoto && profileData.profilePhoto !== "https://randomuser.me/api/portraits/men/46.jpg" ? (
                  <img 
                    src={profileData.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-600">
                    {getInitials(profileData.fullName)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{profileData.fullName}</h2>
                <p className="text-gray-600">Student ID: {profileData.rollNumber}</p>
                <p className="text-gray-600">{profileData.department}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Assignments */}
          <div className="xl:col-span-2 space-y-6">
            <AssignmentsTable />
            <OverallPerformance />
          </div>

          {/* Right Column - Attendance & Leaderboard */}
          <div className="space-y-6">
            <AttendanceTracker />
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  )
}
