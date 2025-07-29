import React from 'react';
import useFetch from '../../../../shared/hooks/UseFetch';
import { useNavigate } from 'react-router-dom';
interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
}

interface Assignment {
  assignment_id: number;
  title: string;
  deadline: string | null;
  points: number;
}

interface Grade {
  student_id: number;
  assignment_id: number;
  obtained_grade: number | null;
  status: string;
}

interface Gradebook {
  students: Student[];
  assignments: Assignment[];
  grades: Grade[];
}

const AssignmentSubmission: React.FC<{ class_id: string }> = ({ class_id }) => {
  const navigate = useNavigate();
  const { data: rawData, error, status } = useFetch<any>({
    method: "GET",
    url: `http://localhost:3000/api/teacher/class/submissions/${class_id}`
    url: `process.env.BACKEND_URL/teacher/class/submissions/${class_id}`
  });
  if (error) {
    console.error("Error fetching data:", error);
    return <p className="p-4 text-red-500">Error loading data</p>;
  }

  const data: Gradebook | undefined = rawData?.[0]?.gradebook_json;

  if (status === 'loading') return <p className="p-4">Loading...</p>;
  if (status === 'error' || !data) return <p className="p-4 text-red-500">Error loading data</p>;

  const { students, assignments, grades } = data;

  const getGrade = (studentId: number, assignmentId: number) => {
    return grades.find(
      (g) => g.student_id === studentId && g.assignment_id === assignmentId
    ) || null;
  };

  const calculateClassAverage = (assignmentId: number) => {
    const assignmentGrades = grades.filter(
      (g) => g.assignment_id === assignmentId && g.obtained_grade !== null
    );
    if (assignmentGrades.length === 0) return '-';
    const total = assignmentGrades.reduce((sum, g) => sum + (g.obtained_grade || 0), 0);
    return (total / assignmentGrades.length).toFixed(0);
  };

  return (
    <div className="min-h-screen  p-4  overflow-x-auto">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow min-w-[800px]">
        
        {/* Header */}
        <div className="grid grid-cols-[260px_repeat(auto-fit,minmax(140px,1fr))] items-start p-4 border-b border-gray-200 bg-white">
          <div className="relative w-full max-w-[240px]">
            <select
              defaultValue="last_name"
              className="appearance-none w-full bg-gray-100 border border-gray-300 text-gray-800 py-2 px-4 pr-8 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="last_name">Sort by last name</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.25 7.5l4.5 4.5 4.5-4.5" />
              </svg>
            </div>
          </div>

          {assignments &&  assignments.map((assignment) => (
            <div key={assignment.assignment_id} className="text-center space-y-1">
              <p className="text-xs text-gray-500">
                {assignment.deadline || 'No due date'}
              </p>
              <a href="#" className="text-blue-600 font-medium text-sm hover:underline">
                {assignment.title}
              </a>
              <p className="text-xs text-gray-500">out of {assignment.points}</p>
              <div className="flex justify-center">
                <button className="text-gray-400 hover:text-gray-600">

                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Class Average Row */}
        <div className="grid grid-cols-[260px_repeat(auto-fit,minmax(140px,1fr))] items-center p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M16 11V4c0-.663-.448-1.2-1-1.2S14 3.337 14 4v7m-4 0V4c0-.663-.448-1.2-1-1.2S8 3.337 8 4v7m-4 0V4c0-.663-.448-1.2-1-1.2S2 3.337 2 4v7"
              />
            </svg>
            Class average
          </div>
           { assignments &&  assignments.map((assignment) => (
            <div key={`avg-${assignment.assignment_id}`} className="text-center font-semibold text-gray-800">
              {calculateClassAverage(assignment.assignment_id)}
            </div>
          ))}
        </div>

        {/* Student Rows */}
        {students &&  students.map((student) => (
          <div
            key={student.student_id}
            className="grid grid-cols-[260px_repeat(auto-fit,minmax(140px,1fr))] items-center p-4 border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3" onClick={() => navigate(`/teacher/class/${class_id}/student/${student.student_id}`)}>
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {student.first_name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-900 underline cursor-pointer hover:text-blue-600">
                {student.first_name} {student.last_name}
              </span>
            </div>

            {assignments &&  assignments.map((assignment) => {
              const grade = getGrade(student.student_id, assignment.assignment_id);
              return (
                <div key={`${student.student_id}-${assignment.assignment_id}`} className="text-center space-y-0.5">
                  <p className={`text-sm font-semibold ${grade?.obtained_grade ? 'text-green-600' : 'text-gray-600'}`}>
                    {grade?.obtained_grade ?? '-'}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    {grade?.status ?? 'Not Submitted'}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentSubmission;
