const attendanceData = {
  attended: 85,
  missed: 15
}

export function AttendanceTracker() {
  const attendedPercentage = attendanceData.attended
  const missedPercentage = attendanceData.missed
  
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-lg font-semibold text-gray-900">📅 Attendance Tracker</h3>
        <select className="w-40 px-3 py-2 border rounded-md" defaultValue="current-month">
          <option value="current-month">Current Month</option>
          <option value="last-month">Last Month</option>
          <option value="semester">This Semester</option>
        </select>
      </div>
      <div className="p-6 pt-0">
        <div className="flex flex-col items-center">
          {/* Simple CSS Pie Chart */}
          <div className="relative w-32 h-32 mb-6">
            <div 
              className="w-32 h-32 rounded-full"
              style={{
                background: `conic-gradient(
                  #3b82f6 0deg ${attendedPercentage * 3.6}deg,
                  #ef4444 ${attendedPercentage * 3.6}deg 360deg
                )`
              }}
            >
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-800">{attendedPercentage}%</span>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Attended ({attendedPercentage}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Missed ({missedPercentage}%)</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            You have attended <span className="font-semibold text-blue-600">{attendedPercentage}%</span> of your classes this month.
          </p>
        </div>
      </div>
    </div>
  )
}
