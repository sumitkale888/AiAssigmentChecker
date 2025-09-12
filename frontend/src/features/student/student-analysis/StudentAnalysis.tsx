import React from 'react';
import Header from '../../../shared/components/header/Header';
import PageList from '../../../shared/components/sidebar/PageList';
import { CheckCircle, FileText, Star, BarChart2 } from "lucide-react";
import {useNavigate} from 'react-router-dom';

// import UseProtectedPage from '../hooks/UseProtectedPage';
const StudentAnalysis: React.FC = () => {
    const navigate = useNavigate();
    const students = [
        {
            name: "Attendance",
            info: "Some additional information about Attendance.",
            matrice: { label: "Attendance", value: 85, icon: <CheckCircle size={30} />, bg: "bg-green-500" },
            route: '/attendance'  
        },
        {
            name: "Assignment",
            info: "Some additional information about Assignment.",
            matrice: { label: "Assignment", value: 90, icon: <FileText size={30} />, bg: "bg-blue-500" }, 
        },
        {
            name: "Overall Performance",
            info: "Some additional information about Overall Performance.",
            matrice: { label: "Performance", value: 95, icon: <Star size={30} />, bg: "bg-yellow-500" },
            route: '/performance' 
        },
        {
            name: "Progress Report",
            info: "Some additional information about Progress Report.",
            matrice: { label: "Progress", value: 80, icon: <BarChart2 size={30} />, bg: "bg-purple-500" },
            route: '/progress'
        },
    ]
    return (
        <div>
            <Header/>
            <div className='flex'>
            <PageList />
            <div className="w-full bg-gray-100 rounded-l-4xl">
            <h1 className="text-3xl text-gray-900 mt-8 px-10 py-2">Student Analysis Page</h1>

            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {students.map((student, index) => (
              <div
                key={index}
                onClick={() => navigate(student.route!)}
                className="w-72 border bg-white rounded-3xl overflow-hidden cursor-pointer border-gray-300 font-inter shadow-md text-black hover:shadow-lg transition-shadow duration-200"
              >
                <div
                  className="relative rounded-t-3xl w-full flex flex-col justify-center items-center p-4 bg-cover bg-center bg-teal-500"
                  style={{ height: "200px", backgroundImage: "none" , borderBottomLeftRadius: "80% 20%",borderBottomRightRadius: "80% 20%", }}
                >
                  <h2 className="text-2xl mb-25 text-black">{student.name}</h2>
                   <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40px]">
                    <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white shadow-lg ${student.matrice.bg}`}>
                        {student.matrice.icon}
                    </div>
                    </div>
                </div>

                <div className="a h-[60px] flex flex-col justify-center cursor-pointer items-center p-4">
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
</div>
    );
};

export default StudentAnalysis;





