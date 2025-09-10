import { useNavigate } from "react-router-dom";

interface AttendanceCardProps {
  class_id: string;
  class_name: string;
  attendance_percentage: string; // e.g. "85.0"
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  class_id,
  class_name,
  attendance_percentage,
}) => {
  const navigate = useNavigate();
  const percentage = parseFloat(attendance_percentage);

  const handleClick = () => {
    navigate(`/student/attendance/${class_id}`);
  };

  // ✅ Color based on percentage
  const getProgressColor = () => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div
      onClick={handleClick}
      className="w-80 bg-white rounded-[30px] shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h2 className="text-2xl font-semibold">{class_name}</h2>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-800">Attendance</span>
          <span
            className={`text-lg font-bold ${
              percentage >= 75
                ? "text-green-600"
                : percentage >= 50
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {attendance_percentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${getProgressColor()}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;








