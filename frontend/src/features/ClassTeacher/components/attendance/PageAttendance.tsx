import React, { useState, useEffect } from "react";
import useFetch from "../../../../shared/hooks/UseFetch";
import AnimatedLoader from "../../../../shared/components/loaders/DefaultLoader";
import { useParams } from "react-router-dom";
import useManualFetch from "../../../../shared/hooks/useManualFetch";

interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  url_dp?: string;
}

interface AttendancePayload {
  class_id: number;
//   date: string;
  students_id: number[];
  status: string[];
}

const PageAttendance: React.FC = () => {
  const { class_id } = useParams<{ class_id: string }>();
  const numericClassId = class_id ? parseInt(class_id, 10) : 0;

  const { data, status } = useFetch({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/teacher/class/students/${numericClassId}`,
  });

  const [statusMap, setStatusMap] = useState<Record<number, string>>({});

  const students: Student[] = Array.isArray(data) ? data : [];

  // ✅ Hook always runs, no conditional calls
  useEffect(() => {
    if (students.length > 0) {
      const initialStatus: Record<number, string> = {};
      students.forEach((s) => (initialStatus[s.student_id] = "Present"));
      setStatusMap(initialStatus);
    }
  }, [students]);

  // --- early return for loading/error after hooks ---
//   if (status === "loading") {
//     return (
//       <div className="mt-[300px]">
//         <AnimatedLoader />
//       </div>
//     );
//   }

  if (status === "error") {
    return <div className="text-center text-red-500">❌ Error loading students.</div>;
  }

  // Initialize default status when data arrives
  useEffect(() => {
    if (students.length > 0) {
      const initialStatus: Record<number, string> = {};
      students.forEach((s) => (initialStatus[s.student_id] = "Present"));
      setStatusMap(initialStatus);
    }
  }, [students]);

  const handleStatusChange = (studentId: number, newStatus: string) => {
    setStatusMap((prev) => ({ ...prev, [studentId]: newStatus }));
  };

  const { execute, status: saveStatus, error: saveError } = useManualFetch();

 const handleSave = async () => {
  const students_id = Object.keys(statusMap).map(Number);
  const statusArray = Object.values(statusMap);

  const payload: AttendancePayload = {
    class_id: numericClassId,
    // date: new Date().toISOString().split("T")[0], // add date if needed
    students_id,
    status: statusArray,
  };

  const result = await execute(
    `${import.meta.env.VITE_BACKEND_URL}/teacher/attendance`,
    "POST",
    payload
  );

  if (result) {
    alert("✅ Attendance saved successfully!");
  } else if (saveError) {
    alert(`❌ Failed: ${saveError.message}`);
  } else {
    alert("❌ Unknown error while saving attendance.");
  }
};


  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-4 mt-6">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>

      <div className="space-y-3">
        {students.map((s) => (
          <div
            key={s.student_id}
            className="flex items-center justify-between border p-3 rounded"
          >
            <div className="flex items-center gap-3">
              {s.url_dp && (
                <img
                  src={s.url_dp}
                  alt={`${s.first_name} ${s.last_name}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium">
                  {s.first_name} {s.last_name}
                </p>
                <p className="text-gray-500 text-sm">{s.email}</p>
              </div>
            </div>

            <select
              className="border rounded p-1"
              value={statusMap[s.student_id] ?? "Present"}
              onChange={(e) => handleStatusChange(s.student_id, e.target.value)}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Attendance
      </button>
    </div>
  );
};

export default PageAttendance;
