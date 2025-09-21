import { useState, useEffect } from "react";
import useFetch from "../../../../shared/hooks/UseFetch";

interface AttendanceAnalytics {
  attended: number;
  missed: number;
  total_classes: number;
  enrolled_classes: number;
  classes_with_attendance: number;
  percentage: number;
}

export function AttendanceTracker() {
  const [timeRange, setTimeRange] = useState("current-month");
  const [overallAttendance, setOverallAttendance] = useState({
    attended: 0,
    missed: 0,
    total_classes: 0,
    percentage: 0
  });
  console.log(overallAttendance);

  const { data, status } = useFetch<AttendanceAnalytics>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/student/analytics/attendance?period=${timeRange}`,
  });

  // Update state when data changes
  useEffect(() => {
    if (data) {
      setOverallAttendance({
        attended: data.attended,
        missed: data.missed,
        total_classes: data.total_classes,
        percentage: data.percentage
      });
    } else {
      // Reset if no data
      setOverallAttendance({
        attended: 0,
        missed: 0,
        total_classes: 0,
        percentage: 0
      });
    }
  }, [data]);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Attendance Tracker</h3>
        <select 
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="current-month">Current Month</option>
          <option value="last-month">Last Month</option>
          <option value="semester">This Semester</option>
        </select>
      </div>
      
      {status === "loading" && (
        <div className="flex justify-center items-center h-48">
          <p>Loading attendance data...</p>
        </div>
      )}
      
      {status === "error" && (
        <div className="flex justify-center items-center h-48">
          <p className="text-red-500">Failed to load attendance data.</p>
        </div>
      )}
      
      {status === "success" && data && data.total_classes > 0 && (
        <div className="flex flex-col items-center">
          {/* Circular Progress Ring */}
          <div className="relative w-32 h-32 mb-6">
            <svg className="w-full h-full" viewBox="0 0 42 42">
              {/* Background circle */}
              <circle 
                className="text-gray-200" 
                cx="21" 
                cy="21" 
                r="15.9155" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              
              {/* Progress circle */}
              <circle
                className="text-blue-500"
                cx="21"
                cy="21"
                r="15.9155"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${data.percentage} ${100 - data.percentage}`}
                strokeDashoffset="25"
                transform="rotate(-90 21 21)"
              ></circle>
              
              {/* Center text */}
              <text 
                x="22" 
                y="24" 
                className="text-[.7rem] font-semibold fill-gray-800" 
                textAnchor="middle"
              >
                {data.percentage.toFixed(1)}%
              </text>
            </svg>
          </div>
          
          {/* Legend */}
          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Attended ({data.attended})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Missed ({data.missed})</span>
            </div>
          </div>
          
          {/* Additional stats */}
          <div className="w-full mb-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Total Classes: </span>
              <span>{data.total_classes}</span>
            </div>
            <div>
              <span className="font-medium">Classes with Attendance: </span>
              <span>{data.classes_with_attendance} of {data.enrolled_classes}</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{data.percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" 
                style={{ width: `${data.percentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Status message */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              You have attended <span className="font-semibold text-blue-600">{data.percentage.toFixed(1)}%</span> of your classes this period.
            </p>
            {data.percentage >= 80 ? (
              <p className="text-sm text-green-600 mt-1">Excellent attendance! Keep it up!</p>
            ) : data.percentage >= 60 ? (
              <p className="text-sm text-yellow-600 mt-1">Good attendance, but try to improve.</p>
            ) : (
              <p className="text-sm text-red-600 mt-1">Your attendance needs improvement.</p>
            )}
          </div>
        </div>
      )}
      
      {status === "success" && data && data.total_classes === 0 && (
        <div className="flex justify-center items-center h-48">
          <p>No attendance data available for this period.</p>
        </div>
      )}
    </div>
  );
}
