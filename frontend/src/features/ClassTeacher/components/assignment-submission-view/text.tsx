import React, { useState } from 'react';

const App = () => {
  const [students] = useState([
    {
      id: 1,
      firstName: 'Pruthviraj',
      lastName: 'Gawande',
      email: 'pruthviraj.gawande@example.com',
      dpUrl: 'public/img/user_photo',
    },
    {
      id: 2,
      firstName: 'kruthviraj',
      lastName: 'Gawande',
      email: 'pruthviraj.gawande@example.com',
      dpUrl: 'public/img/user_photo',
    },
  ]);

  const [assignments] = useState([
    { id: 101, title: 'fgf', dueDate: 'No due date', points: 100 },
    { id: 102, title: 'bbfgb', dueDate: 'No due date', points: 100 },
  ]);

  const [grades] = useState([
    { studentId: 1, assignmentId: 101, obtainedGrade: 54, status: 'Draft' },
    { studentId: 1, assignmentId: 102, obtainedGrade: 0, status: 'Draft' },
  ]);

  const getGrade = (studentId, assignmentId) => {
    return grades.find(
      (g) => g.studentId === studentId && g.assignmentId === assignmentId
    ) || null;
  };

  const calculateClassAverage = (assignmentId) => {
    const assignmentGrades = grades.filter(
      (g) => g.assignmentId === assignmentId && g.obtainedGrade !== null
    );
    if (assignmentGrades.length === 0) return '-';
    const total = assignmentGrades.reduce((sum, g) => sum + g.obtainedGrade, 0);
    return (total / assignmentGrades.length).toFixed(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow">
        
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

          {assignments.map((assignment) => (
            <div key={assignment.id} className="text-center space-y-1">
              <p className="text-xs text-gray-500">{assignment.dueDate}</p>
              <a href="#" className="text-blue-600 font-medium text-sm hover:underline">
                {assignment.title}
              </a>
              <p className="text-xs text-gray-500">out of {assignment.points}</p>
              <div className="flex justify-center">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
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
          {assignments.map((assignment) => (
            <div key={`avg-${assignment.id}`} className="text-center font-semibold text-gray-800">
              {calculateClassAverage(assignment.id)}
            </div>
          ))}
        </div>

        {/* Student Rows */}
        {students.map((student) => (
          <div
            key={student.id}
            className="grid grid-cols-[260px_repeat(auto-fit,minmax(140px,1fr))] items-center p-4 border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {student.firstName.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {student.firstName} {student.lastName}
              </span>
            </div>

            {assignments.map((assignment) => {
              const grade = getGrade(student.id, assignment.id);
              return (
                <div key={`${student.id}-${assignment.id}`} className="text-center space-y-0.5">
                  <p className="text-green-600 font-semibold text-sm">
                    {grade ? grade.obtainedGrade : '-'}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    {grade ? grade.status : 'Not submitted'}
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

export default App;
