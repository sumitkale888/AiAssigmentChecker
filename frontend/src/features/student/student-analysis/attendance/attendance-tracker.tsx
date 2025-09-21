export function AttendanceTracker() {
  const attendanceData = {
    attended: 85,
    missed: 15
  }

  const attendedPercentage = attendanceData.attended
  const missedPercentage = attendanceData.missed
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Attendance Tracker</h3>
        <select className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white">
          <option value="current-month">Current Month</option>
          <option value="last-month">Last Month</option>
          <option value="semester">This Semester</option>
        </select>
      </div>
      
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
              strokeDasharray={`${attendedPercentage} ${100 - attendedPercentage}`}
              strokeDashoffset="25"
              transform="rotate(-90 21 21)"
            ></circle>
            
            {/* Center text */}
            <text 
              x="22" 
              y="24" 
              className="text-[.7rem] font-semibold fill-gray-800 " 
              textAnchor="middle"
            >
              {attendedPercentage}%
            </text>
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Attended ({attendedPercentage}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Missed ({missedPercentage}%)</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{attendedPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" 
              style={{ width: `${attendedPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Status message */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            You have attended <span className="font-semibold text-blue-600">{attendedPercentage}%</span> of your classes this month.
          </p>
          {attendedPercentage >= 80 ? (
            <p className="text-sm text-green-600 mt-1">Excellent attendance! Keep it up!</p>
          ) : attendedPercentage >= 60 ? (
            <p className="text-sm text-yellow-600 mt-1">Good attendance, but try to improve.</p>
          ) : (
            <p className="text-sm text-red-600 mt-1">Your attendance needs improvement.</p>
          )}
        </div>
      </div>
    </div>
  )
}