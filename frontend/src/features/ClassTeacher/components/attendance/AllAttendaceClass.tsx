import { useState } from "react";
import useFetch from "../../../../shared/hooks/UseFetch";
import AnimatedLoader from "../../../../shared/components/loaders/DefaultLoader";

type AttendanceRecord = {
  date: string;
  first_marked_time: string;
  percentage_present: number;
};
const formatDate = (dateString:any) => {
  const date = new Date(dateString);
  const options:any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 6, // To include microseconds
    timeZoneName: 'short',
    hour12: true, // Use 12-hour format with AM/PM
  };
  return date.toLocaleString('en-US', options);
};

const AllAttendaceClass: React.FC<{ class_id: string }> = ({ class_id }) => {
  const { data, status } = useFetch<AttendanceRecord[]>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/teacher/attendance/class/${class_id}`,
  });

  const [filter, setFilter] = useState("all");

  const getFilteredData = () => {
    if (!data) return [];
    switch (filter) {
      case "high":
        return data.filter((item) => item.percentage_present >= 90);
      case "medium":
        return data.filter(
          (item) =>
            item.percentage_present >= 75 && item.percentage_present < 90,
        );
      case "low":
        return data.filter((item) => item.percentage_present < 75);
      default:
        return data;
    }
  };

  const filteredData = getFilteredData();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen b">
        <AnimatedLoader />
      </div>
    );
  }

  if (status === "error" || !data || data.length === 0) {
    return (
      <div className="text-center mt-20 p-6 bg-white rounded-xl shadow-md mx-auto max-w-lg">
        <p className="text-xl font-semibold text-gray-800 mb-2">
          No Attendance Data Available
        </p>
        <p className="text-gray-500">
          It looks like there are no attendance records for this class yet.
        </p>
      </div>
    );
  }

  return (
    <div className="   min-h-screen pl-0 ml-0">
      <div className="max-w-7xl ">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">

          <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-sm">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("high")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "high"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              &ge; 90%
            </button>
            <button
              onClick={() => setFilter("medium")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "medium"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              75-89%
            </button>
            <button
              onClick={() => setFilter("low")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "low"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              &lt; 75%
            </button>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-lg  mt-6">
            <p className="text-xl font-semibold text-gray-700">
              No records match the current filter.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      First Marked Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage Present
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(item.date.split('T')[0])}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.first_marked_time.split(".")[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            item.percentage_present >= 90
                              ? "bg-green-100 text-green-800"
                              : item.percentage_present >= 75
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
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
        )}
      </div>
    </div>
  );
};

export default AllAttendaceClass;