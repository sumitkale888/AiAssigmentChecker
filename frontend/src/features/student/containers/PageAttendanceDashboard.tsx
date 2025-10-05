import { Link } from "react-router-dom";
import Header from "../../../shared/components/header/Header";
import PageList from "../../../shared/components/sidebar/PageList";
import AttendanceCard from "../components/student-Attendance-view/AttendanceCard";
import useFetch from "../../../shared/hooks/UseFetch";

interface ClassSummary {
  class_id: string;
  class_name: string;
  attendance_percentage: string;
}

const PageAttendanceDashboard = () => {
  const { data, status } = useFetch<ClassSummary[]>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/student/attendance/summary`,
  });

  const classes = data ?? [];
  


  return (
    <div>
      <Header />
      <div className="flex">
        <PageList userType="student"/>
        <div className="p-6 flex flex-wrap gap-4 w-full bg-gray-50 rounded-l-4xl">
          {status === "loading" && <p>Loading attendance...</p>}
          {status === "error" && (
            <p className="text-red-500">Failed to load attendance data.</p>
          )}

          {status === "success" && classes.length > 0 && (
            classes.map((c) => (
              <Link
                key={c.class_id}
                to={`/student/attendance/${c.class_id}`}
                className="block"
              >
                <AttendanceCard
                  class_id={c.class_id}
                  class_name={c.class_name}
                  attendance_percentage={c.attendance_percentage}
                />
              </Link>
            ))
          )}

          {status === "success" && classes.length === 0 && (
            <p>No classes found.</p>
          )}

         
          {status === "error" && (
            <p className="text-red-500 text-center">
              Failed to load attendance data.
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default PageAttendanceDashboard;
