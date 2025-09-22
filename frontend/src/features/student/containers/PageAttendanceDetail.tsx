import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { io } from "socket.io-client"
import useFetch from "../../../shared/hooks/UseFetch";
import useManualFetch from "../../../shared/hooks/useManualFetch";
import Header from "../../../shared/components/header/Header";
import PageList from "../../../shared/components/sidebar/PageList";

type AttendanceRecord = {
  date: string; // e.g. "2025-09-01"
  status: "Present" | "Absent";
  remarks?: string;
};

interface ApiResponse {
  success: boolean;
  message?: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold";

  if (status === "Present") {
    return <span className={`${base} bg-green-100 text-green-700`}>Present</span>;
  }
  if (status === "Absent") {
    return <span className={`${base} bg-red-100 text-red-700`}>Absent</span>;
  }
  if (status === "Late") {
    return <span className={`${base} bg-yellow-100 text-yellow-700`}>Late</span>;
  }
  return <span className={`${base} bg-gray-100 text-gray-600`}>{status}</span>;
};

const PageAttendanceDetail: React.FC = () => {
  const { class_id, session_id } = useParams<{ class_id: string; session_id?: string }>();


  const { data: attendance, status } = useFetch<AttendanceRecord[]>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/student/attendance/detail/${class_id}`,
  });

  // sessionActive should contain both active and session_id
  const { data: sessionActive } = useFetch<{ active: boolean; session_id?: string }>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/student/biometric_attendance/active_session/${class_id}`,
  });

  const { execute, status: markStatus, error: markError } = useManualFetch<ApiResponse>();

  const markAttendance = async () => {
    if (!sessionActive?.active || !sessionActive.session_id) {
      alert("No active session found.");
      return;
    }

    const data = await execute(
      `${import.meta.env.VITE_BACKEND_URL}/student/attendance/mark/${session_id}`,
      "POST",
      {
        session_id: sessionActive.session_id,
        status: "Present",
        method: "self_mark",
      }
    );

    if (data) {
      alert("Attendance marked successfully!");
      window.location.reload(); // ✅ Or trigger refetch if available
    } else {
      alert("Failed to mark attendance.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <PageList userType="student" />

        {/* Main Content */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 bg-gray-300 min-h-screen font-sans rounded-l-3xl">
          <div className="max-w-5xl mx-auto bg-white rounded-[30px] shadow-md overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
                Attendance Details
              </h1>

              {/* Loading / Error States */}
              {status === "loading" && (
                <p className="text-gray-500 text-center">Loading attendance...</p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-center">Failed to load attendance.</p>
              )}
              {markStatus === "loading" && (
                <p className="text-gray-500 text-center">Marking attendance...</p>
              )}

              {markError && (
                <p className="text-red-500 text-center">Failed to mark attendance</p>
              )}


              {/* Attendance Table */}
              {status === "success" && attendance && attendance.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                        {/* <th className="px-4 py-3 text-sm font-medium text-gray-600">Remarks</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Conditional Mark Attendance Row */}
                      {sessionActive?.active && (
                        <tr className="bg-yellow-50 border-b">
                          <td colSpan={2} className="px-4 py-3 text-center">
                            <button
                              onClick={markAttendance}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                              Mark Attendance
                            </button>
                          </td>
                        </tr>
                      )}
                      {attendance.map((record, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-800 text-sm">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={record.status} />
                          </td>
                          {/* <td className="px-4 py-3 text-gray-600 text-sm">
                            {record.remarks || "-"}
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                status === "success" && (
                  <p className="text-gray-500 text-center">No attendance records yet.</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAttendanceDetail;
