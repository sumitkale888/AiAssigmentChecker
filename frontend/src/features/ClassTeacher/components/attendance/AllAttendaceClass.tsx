import useFetch from "../../../../shared/hooks/UseFetch";
import AnimatedLoader from "../../../../shared/components/loaders/DefaultLoader";

const AllAttendaceClass: React.FC<{ class_id: string }> = ({ class_id }) => {
  const { data, status } = useFetch({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/teacher/attendance/class/${class_id}`,
  });

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <AnimatedLoader />
      </div>
    );
  }

  if (status === "error" || !data || data.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600">
        No attendance data available.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Attendance Records
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Lecture No.</th>
              <th className="px-4 py-2 text-left">First Marked Time</th>
              <th className="px-4 py-2 text-left">Percentage Present</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">{item.lecture_number}</td>
                <td className="px-4 py-3">{item.first_marked_time}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.percentage_present >= 90
                        ? "bg-green-100 text-green-700"
                        : item.percentage_present >= 75
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.percentage_present}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAttendaceClass;
