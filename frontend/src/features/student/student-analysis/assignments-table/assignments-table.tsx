const assignments = [
  {
    title: "Algebra Midterm",
    dueDate: "2024-11-20",
    status: "pending",
  },
  {
    title: "History Essay",
    dueDate: "2024-11-10",
    status: "overdue",
  },
  {
    title: "Chemistry Project",
    dueDate: "2024-11-25",
    status: "pending",
  },
  {
    title: "Biology Presentation",
    dueDate: "2024-11-22",
    status: "pending",
  },
]

export function AssignmentsTable() {
  return (
    <div className="bg-white rounded-3xl shadow-xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">📚 Assignments</h3>
        <div className="w-full">
          <div className="flex border-b">
            <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium">Upcoming</button>
            <button className="px-4 py-2 text-gray-500">Past</button>
          </div>
          <div className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                <div>Title</div>
                <div>Due Date</div>
                <div>Status</div>
              </div>
              {assignments.map((assignment, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 items-center py-2">
                  <div className="text-sm text-gray-900">{assignment.title}</div>
                  <div className="text-sm text-gray-600">{assignment.dueDate}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {assignment.status === "pending" ? "⏳ Pending" : "🔴 Overdue"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
