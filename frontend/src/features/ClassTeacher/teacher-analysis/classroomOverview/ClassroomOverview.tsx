import React from "react";
import useFetch from "../../../../shared/hooks/UseFetch";

interface ClassroomOverviewData {
  total_classes: number;
  total_students: number;
  avg_class_performance: number;
  pending_assignments_rate: number;
  attendance_rate: number;
  overall_avg_grade: number;
}

const ClassroomOverview: React.FC = () => {
  const { data: overviewData, status } = useFetch<ClassroomOverviewData>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/teacher/analytics/classroom-overview`,
  });

  const overviewCards = [
    {
      title: "Total Students",
      value: overviewData?.total_students || 0,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Total number of students across all your classes",
    },
    {
      title: "Avg Class Performance",
      value: `${overviewData?.avg_class_performance || 0}%`,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Average assignment completion rate across all classes",
    },
    {
      title: "Pending Assignments",
      value: `${overviewData?.pending_assignments_rate || 0}%`,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Percentage of assignments not yet submitted",
    },
    {
      title: "Attendance Rate",
      value: `${overviewData?.attendance_rate || 0}%`,
      color: "text-green-700",
      bgColor: "bg-green-100",
      description: "Overall attendance rate across all classes",
    },
  ];

  if (status === "loading") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl p-5 shadow-sm bg-gray-100 animate-pulse"
          >
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl p-5 shadow-sm bg-red-50 border border-red-200"
          >
            <h3 className="font-semibold text-gray-700 mb-1">Error</h3>
            <p className="text-red-600 text-sm">Failed to load data</p>
          </div>
        ))}
      </div>
    );
  }

  // Show empty state if no data
  if (!overviewData || overviewData.total_classes === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {overviewCards.map((card) => (
          
          <div
            key={card.title}
            className="rounded-2xl p-5 shadow-sm bg-gray-50 border border-gray-200"
          >
            <h3 className="font-semibold text-gray-700 mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-400 select-none">0</p>
            <p className="mt-2 text-xs text-gray-500 leading-tight">
              No classes created yet
            </p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {overviewCards.map(({ title, value, color, bgColor, description }) => (
        <div
          key={title}
          className={`rounded-2xl p-5 shadow-sm ${bgColor} cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-gray-200`}
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