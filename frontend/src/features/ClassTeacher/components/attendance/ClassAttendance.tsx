import { useNavigate } from "react-router-dom";
import AllAttendaceClass from "./AllAttendaceClass";
import { useState } from "react";

const options = [
  { value: "checklist", label: "Checklist" },
  { value: "biometric", label: "Biometric" },
];

const ClassAttendance: React.FC<{ class_id: string }> = ({ class_id }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
    if (value === "checklist") {
      navigate(`/teacher/checklist_attendance/class/${class_id}`);
    } else if (value === "biometric") {
      navigate(`/teacher/biometric_attendance/class/${class_id}`);
    }
  };

  return (
    <div className="  lg:p-8 pt-0 mt-0">
      <div className="relative w-64 mb-6">
        <button
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
          onClick={() => setOpen(!open)}
        >
          {selected || "Select Attendance Mode"}
          <span className="ml-2">&#9662;</span>
        </button>

        {open && (
          <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <AllAttendaceClass class_id={class_id} />
    </div>
  );
};

export default ClassAttendance;
