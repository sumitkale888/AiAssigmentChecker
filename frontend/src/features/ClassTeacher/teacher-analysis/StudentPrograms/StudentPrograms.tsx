import React, { useState } from "react";
import useFetch from "../../../../shared/hooks/UseFetch";

interface ClassFeedbackSummary {
  class_id: number;
  class_name: string;
  subject: string;
  total_students: number;
  total_submissions: number;
  graded_submissions: number;
  feedback_count: number;
  avg_grade: number;
  common_weaknesses: string;
  improvement_areas: string;
}

interface DetailedFeedback {
  grade_id: number;
  obtained_grade: number;
  feedback: string;
  corrections: string;
  suggestions: string;
  weaknesses: string;
  improvementAreas: string;
  assignment_title: string;
  assignment_description: string;
  max_points: number;
  student_id: number;
  student_name: string;
  submission_date: string;
}

const StudentProgramsParticipation: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<ClassFeedbackSummary | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data: classFeedback, status } = useFetch<ClassFeedbackSummary[]>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/teacher/analytics/class-feedback`,
  });

  const { data: detailedFeedback, status: detailStatus } = useFetch<DetailedFeedback[]>({
    method: "GET",
    url: selectedClass 
      ? `${import.meta.env.VITE_BACKEND_URL}/teacher/analytics/class-feedback/${selectedClass.class_id}`
      : "",
  });

  const handleReadMore = (classItem: ClassFeedbackSummary) => {
    setSelectedClass(classItem);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClass(null);
  };

  // Generate meaningful descriptions based on data
  const generateDescription = (classItem: ClassFeedbackSummary) => {
    const weaknesses = classItem.common_weaknesses ? classItem.common_weaknesses.split('|').slice(0, 2).join(', ') : '';
    const improvements = classItem.improvement_areas ? classItem.improvement_areas.split('|').slice(0, 2).join(', ') : '';
    
    let description = `Average grade: ${classItem.avg_grade}%. `;
    
    if (weaknesses) {
      description += `Common issues: ${weaknesses}. `;
    }
    
    if (improvements) {
      description += `Focus areas: ${improvements}.`;
    }
    
    if (!weaknesses && !improvements) {
      description = `${classItem.feedback_count} feedback entries. ${classItem.graded_submissions} assignments graded.`;
    }
    
    return description.length > 150 ? description.substring(0, 147) + '...' : description;
  };

  const getColorScheme = (index: number) => {
    const schemes = [
      { color: "text-indigo-600", bgColor: "bg-indigo-50" },
      { color: "text-green-600", bgColor: "bg-green-50" },
      { color: "text-purple-600", bgColor: "bg-purple-50" },
      { color: "text-yellow-600", bgColor: "bg-yellow-50" },
      { color: "text-blue-600", bgColor: "bg-blue-50" },
      { color: "text-red-600", bgColor: "bg-red-50" },
    ];
    return schemes[index % schemes.length];
  };

  if (status === "loading") {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Class Performance Feedback</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-[200px]">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-gray-200 shadow-sm p-5 animate-pulse"
            >
              <div className="flex justify-between mb-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-8"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Class Performance Feedback</h2>
        <div className="text-center py-8 text-red-500">
          Failed to load class feedback data
        </div>
      </div>
    );
  }

  if (!classFeedback || classFeedback.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Class Performance Feedback</h2>
        <div className="text-center py-8 text-gray-500">
          No feedback data available yet. Grade some assignments to see insights.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Class Performance Feedback</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-[200px]">
          {classFeedback.slice(0, 4).map((classItem, index) => {
            const { color, bgColor } = getColorScheme(index);
            const description = generateDescription(classItem);
            
            return (
              <div
                key={classItem.class_id}
                className={`${bgColor} rounded-2xl border border-gray-200 shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow duration-300 items-start`}
                title={`${classItem.class_name} - ${classItem.subject}`}
              > 
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-gray-700">
                    {classItem.class_name.length > 15 
                      ? classItem.class_name.substring(0, 12) + '...' 
                      : classItem.class_name
                    }
                  </span>
                  <span className={`font-extrabold text-xl select-none ${color}`}>
                    {classItem.avg_grade || 0}%
                  </span>
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {classItem.subject}
                </div>
                <span className="font-medium text-sm select-none text-gray-600">
                  {description}
                </span>
                
                <button
                  onClick={() => handleReadMore(classItem)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-3 block"
                >
                  Read feedback →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Feedback Modal */}
      {showModal && selectedClass && (
        <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedClass.class_name}
                  </h2>
                  <p className="text-gray-600">{selectedClass.subject}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Class Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-1">Total Students</h3>
                  <p className="text-2xl font-bold text-blue-600">{selectedClass.total_students}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-700 mb-1">Avg Grade</h3>
                  <p className="text-2xl font-bold text-green-600">{selectedClass.avg_grade}%</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-700 mb-1">Feedback Given</h3>
                  <p className="text-2xl font-bold text-purple-600">{selectedClass.feedback_count}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-700 mb-1">Submissions</h3>
                  <p className="text-2xl font-bold text-yellow-600">{selectedClass.total_submissions}</p>
                </div>
              </div>

              {/* Common Issues */}
              {selectedClass.common_weaknesses && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Common Issues Identified</h3>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedClass.common_weaknesses}</p>
                  </div>
                </div>
              )}

              {/* Improvement Areas */}
              {selectedClass.improvement_areas && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Suggested Improvement Areas</h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedClass.improvement_areas}</p>
                  </div>
                </div>
              )}

              {/* Detailed Student Feedback */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Student Feedback Details</h3>
                {detailStatus === "loading" && (
                  <div className="text-center py-4">Loading detailed feedback...</div>
                )}
                {detailStatus === "error" && (
                  <div className="text-center py-4 text-red-500">Failed to load detailed feedback</div>
                )}
                {detailedFeedback && detailedFeedback.length > 0 ? (
                  <div className="space-y-4">
                    {detailedFeedback.map((feedback) => (
                      <div key={feedback.grade_id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{feedback.student_name}</h4>
                            <p className="text-sm text-gray-600">{feedback.assignment_title}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              {feedback.obtained_grade}/{feedback.max_points}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(feedback.submission_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        {feedback.feedback && feedback.feedback !== 'No feedback provided' && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Feedback:</p>
                            <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">{feedback.feedback}</p>
                          </div>
                        )}
                        
                        {feedback.suggestions && feedback.suggestions !== 'No suggestions provided' && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Suggestions:</p>
                            <p className="text-sm text-gray-600 bg-green-50 p-2 rounded">{feedback.suggestions}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No detailed feedback available for this class
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProgramsParticipation;