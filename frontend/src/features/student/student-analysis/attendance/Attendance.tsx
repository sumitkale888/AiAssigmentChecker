import React from 'react';
import Header from '../../../../shared/components/header/Header';
import PageList from '../../../../shared/components/sidebar/PageList';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
 import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
// import UseProtectedPage from '../hooks/UseProtectedPage';


const Attendance: React.FC = () => {
     
   const subjectAttendanceData = {
    labels: ["Math", "Science", "English", "History", "Computer"],
    datasets: [
      {
        label: "Attendance %",
        data: [92, 85, 88, 95, 90],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

   // 🔹 Overall Attendance Data (Pie Chart)
  // Example: Present = 88%, Absent = 12%
  const overallAttendanceData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [88, 12],
        backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

    return (
        <div>
            <Header/>
            <div className='flex'>
            <PageList />
            <div className="w-full bg-gray-100 rounded-l-4xl">
                <h1 className="text-3xl text-gray-900 mt-8 px-10 py-2">Overall Attendance</h1>
                <div className="p-6 grid gap-6 md:grid-cols-2 ">
                {/* 📊 Subject-wise Attendance */}
                <div className="bg-white shadow-lg rounded-2xl p-8">
                    <h2 className="text-xl font-semibold mb-4">Subject-wise Attendance</h2>
                    <div className="h-72 flex justify-center items-center">
                    <Bar data={subjectAttendanceData} />
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Overall Attendance</h2>
                    <div className="h-72 flex justify-center items-center">
                    <Pie data={overallAttendanceData} />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default Attendance;





