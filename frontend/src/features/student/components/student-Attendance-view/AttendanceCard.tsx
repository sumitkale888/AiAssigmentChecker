import { useNavigate } from "react-router-dom";

interface AttendanceCardProps {
  class_id: string;
  class_name: string;
  attendance_percentage: string; // e.g. "85.0"
}

const colorOptions = [
  'bg-blue-500',
  'bg-red-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-gray-500',
  'bg-emerald-500',
  'bg-lime-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-violet-500',
  'bg-fuchsia-500',
  'bg-rose-500'
];

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  class_id,
  class_name,
  attendance_percentage,
}) => {
  const navigate = useNavigate();
  const percentage = parseFloat(attendance_percentage);
  const randomColorClass = colorOptions[Math.floor(Math.random() * colorOptions.length)];
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
      className="w-72 bg-white rounded-[30px] shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
    > 
      {/* Header */}
      <div className={`p-6 bg-gradient-to-r ${randomColorClass} text-white flex justify-between`}>
        <h2 className="text-2xl font-semibold">{class_name}</h2>
          <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-blue-200 opacity-80" 
            style={{ transform: 'rotate(-15deg)' }} 
          >
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 3.694-9.75 8.25 0 1.06.20 2.071.581 3.003L3 15.75l-1.559 1.559A2.25 2.25 0 0 0 1.5 21.75h19.5a2.25 2.25 0 0 0 1.559-4.441L21 15.75l-.331-.747A8.47 8.47 0 0 0 21.75 10.5c0-4.556-4.365-8.25-9.75-8.25ZM6.75 10.5a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H6.75Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H6.75Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H9Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H9Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H11.25Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H11.25Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H13.5Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H13.5Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H15.75Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H15.75Z" clipRule="evenodd" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
          </svg>
          </div>
      </div>

      {/* Body */}
      <div className="p-6 py-6 flex flex-col space-y-4 h-[150px]">
        <div className="flex justify-between items-end">
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








