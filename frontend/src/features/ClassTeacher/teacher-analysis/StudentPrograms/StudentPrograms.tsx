import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentProgramsParticipation: React.FC = () => {
  const programs = [
    { name: "Coding Club", count: 90, color: "text-indigo-600", bgColor: "bg-indigo-50", description: "Many of the club MLSC,CSI all the coding Club in keep going yours students are excellents" },
    { name: "Sports Team", count: 120, color: "text-green-600", bgColor: "bg-green-50", description: "Sports club like cricket, kabaddi many of the sports and event your students participate" },
    { name: "Art Workshop", count: 75, color: "text-purple-600", bgColor: "bg-purple-50", description: "Art workshop is also good kind of people in your classroom these kind of progress we all the need and learn student" },
    { name: "Robotics Team", count: 35, color: "text-yellow-600", bgColor: "bg-yellow-50", description: "Robotics Teams and Innovative these mind blowing and best learner can you do these all works" },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Programs Participation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-[200px]">
        {programs.map(({ name, count, color, bgColor , description }) => (
          <div
            key={name}
            className={`${bgColor} rounded-2xl border border-gray-200 shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow duration-300 items-start`}
            title={`Participating students in ${name}`}
          > 
            <div className="flex justify-between mb-4">
            <span className="font-semibold text-gray-700">{name}</span>
            <span className={`font-extrabold text-xl select-none ${color}`}>{count}</span>
            </div>
            <span className={`font-medium text-sm select-none`}>{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentProgramsParticipation