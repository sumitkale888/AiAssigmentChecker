import { useState, useEffect } from "react"
import { Lightbulb } from "lucide-react"

const subjects = [
  { name: "Mathematics", score: "85%", grade: "B" },
  { name: "Physics", score: "92%", grade: "A-" },
  { name: "History", score: "78%", grade: "C+" },
  { name: "Literature", score: "88%", grade: "B+" },
]

export function OverallPerformance() {
  const [studentName, setStudentName] = useState("John Doe");

  useEffect(() => {
    const storedData = localStorage.getItem("studentProfile");
    if (storedData) {
      const profileData = JSON.parse(storedData);
      setStudentName(profileData.fullName || "John Doe");
    }
  }, []);
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">📈 Overall Performance</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">GPA:</span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">3.43</span>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
            <div>Subject</div>
            <div>Score</div>
            <div>Grade</div>
          </div>
          {subjects.map((subject, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-900">{subject.name}</div>
              <div className="text-sm text-gray-600">{subject.score}</div>
              <div className="text-sm font-medium">{subject.grade}</div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">💡 AI Insight:</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                Hi {studentName.split(' ')[0]}! Your current GPA is 3.43. Focus on improving your History scores by reviewing key concepts and engaging
                in class discussions. Consider joining a study group for additional support in areas of difficulty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
