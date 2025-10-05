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

const ClassroomOverview: React.FC = () => {
  const overviewData = [
    {
      title: "Total Students",
      value: 145,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description:
        "Group of students icon. Energetic style with balanced space.",
    },
    {
      title: "Avg Class Performance",
      value: "88%",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description:
        "Bar chart icon. Represents class performance trends.",
    },
    {
      title: "Pending Assignments",
      value: 12,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description:
        "Document icon with warning sign. Pending assignments.",
    },
    {
      title: "Attendance Rate",
      value: "95%",
      color: "text-green-700",
      bgColor: "bg-green-100",
      description:
        "Calendar with checkmark icon representing attendance rate.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {overviewData.map(({ title, value, color, bgColor, description }) => (
        <div
          key={title}
          className={`rounded-2xl p-5 shadow-sm ${bgColor} cursor-pointer hover:shadow-lg transition-shadow duration-300`}
          title={description}
        >
          <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
          <p className={`text-3xl font-bold ${color} select-none`}>{value}</p>
          <p className="mt-2 text-xs text-gray-500 leading-tight">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default ClassroomOverview;
