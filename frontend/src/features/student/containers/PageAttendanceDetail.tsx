import { Link } from "react-router-dom";
import Header from "../../../shared/components/header/Header";
import PageList from "../../../shared/components/sidebar/PageList";
import useFetch from "../../../shared/hooks/UseFetch";

interface ClassSummary {
  class_id: string;
  class_name: string;
  attendance_percentage: string;
  total_classes?: number;
  attended_classes?: number;
}

const PageAttendanceDashboard = () => {
  const { data, status } = useFetch<ClassSummary[]>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/student/attendance/summary`,
  });

  const classes = data ?? [];

  // Function to compute attendance status
  const getStatus = (percent: number) => {
    if (percent >= 75) return { label: "Good", color: "bg-green-100 text-green-700" };
    if (percent >= 50) return { label: "Low", color: "bg-yellow-100 text-yellow-700" };
    return { label: "Critical", color: "bg-red-100 text-red-700" };
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <PageList userType="student" />
        <div className="p-6 px-20 w-full bg-gray-50 rounded-l-4xl">
          <h2 className="text-3xl font-bold mb-4">Subject-wise Attendance</h2>
          <p className="text-gray-500 mb-6">
            Detailed breakdown of attendance for each subject.
          </p>

          {status === "loading" && <p>Loading attendance...</p>}
          {status === "error" && (
            <p className="text-red-500">Failed to load attendance data.</p>
          )}

          {status === "success" && classes.length > 0 && (
            <div className="border-b overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">Subject</th>
                    <th className="px-6 py-3">Total Classes</th>
                    <th className="px-6 py-3">Classes Attended</th>
                    <th className="px-6 py-3">Attendance %</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((c) => {
                    const percentage = parseFloat(c.attendance_percentage);
                    const statusObj = getStatus(percentage);

                    // If backend doesn’t return these, fallback to placeholders
                    const total = c.total_classes ?? 20;
                    const attended =
                      c.attended_classes ?? Math.round((percentage / 100) * total);

                    return (
                      <tr
                        key={c.class_id}
                        className="hover:bg-gray-50 transition border-b border-gray-200"
                      >
                        <td className="px-6 py-4 font-medium text-gray-800">
                          <Link to={`/student/attendance/${c.class_id}`}>
                            {c.class_name}
                          </Link>
                        </td>
                        <td className="px-6 py-4">{total}</td>
                        <td className="px-6 py-4">{attended}</td>
                        <td className="px-6 py-4">{percentage.toFixed(2)}%</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusObj.color}`}
                          >
                            {statusObj.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination Placeholder */}

            </div>
          )}

          {status === "success" && classes.length === 0 && (
            <p>No classes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageAttendanceDashboard;
