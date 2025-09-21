import { useState, useEffect } from "react";
import useFetch from "../../../../shared/hooks/UseFetch";

interface TestFeedback {
  grade_id: number;
  obtained_grade: number;
  feedback: string;
  corrections: string;
  suggestions: string;
  weaknesses: string;
  improvementAreas: string;
  assignment_title: string;
  assignment_description: string;
  class_name: string;
  subject: string;
  submission_date: string;
}

export const ProductivityTips = () => {
  const [feedbackTips, setFeedbackTips] = useState<any[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<TestFeedback | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const { data, status } = useFetch<TestFeedback[]>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/student/feedback/recent?limit=3`,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      // Transform the feedback data into tips format
      const tips = data.map((feedback, index) => {
        const colors = ['indigo', 'green', 'yellow'];
        const icons = ['📝', '🧠', '📊'];
        
        // Generate meaningful content from feedback
        let content = "";
        if (feedback.feedback) {
          content = feedback.feedback;
        } else if (feedback.suggestions) {
          content = feedback.suggestions;
        } else if (feedback.improvementAreas) {
          content = `Focus on: ${feedback.improvementAreas}`;
        } else {
          content = `Scored ${feedback.obtained_grade} on ${feedback.assignment_title}.`;
        }
        
        // Truncate content if too long
        if (content.length > 100) {
          content = content.substring(0, 97) + '...';
        }
        
        return {
          icon: icons[index % icons.length],
          color: colors[index % colors.length],
          title: `${feedback.subject} Feedback`,
          content: content,
          fullFeedback: feedback,
          hasMoreContent: feedback.feedback || feedback.suggestions || feedback.improvementAreas
        };
      });
      
      setFeedbackTips(tips);
    } else {
      // Fallback to default tips if no feedback available
      setFeedbackTips([
        {
          icon: '⏰',
          color: 'indigo',
          title: 'Time Management',
          content: "Based on your patterns, you're most productive between 9:00 AM - 11:30 AM. Schedule important tasks during this window."
        },
        {
          icon: '🧠',
          color: 'green',
          title: 'Focus Areas',
          content: "You complete coding tasks faster than documentation. Consider pairing with someone who excels in documentation."
        },
        {
          icon: '☕',
          color: 'yellow',
          title: 'Wellness',
          content: "Your productivity dips after 2 hours of continuous work. Try the Pomodoro technique with 25-minute focused sessions."
        }
      ]);
    }
  }, [data]);

  const handleReadMore = (feedback: TestFeedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFeedback(null);
  };

  if (status === "loading") {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden w-[80rem] h-[20rem]">
        <div className="flex items-center gap-3 p-5 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
            💡
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 h-[14rem]">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 rounded-lg bg-gray-100 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-300"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
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

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden w-[80rem] h-[20rem]">
        <div className="flex items-center gap-3 p-5 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
            💡
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {data && data.length > 0 ? 'Recent Test Feedback' : 'AI Feedback Tips'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 h-[14rem]">
          {feedbackTips.map((tip, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg relative ${
                tip.color === 'indigo' ? 'bg-indigo-50' : 
                tip.color === 'green' ? 'bg-green-50' : 'bg-yellow-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
                  tip.color === 'indigo' ? 'bg-indigo-600' : 
                  tip.color === 'green' ? 'bg-green-600' : 'bg-yellow-600'
                }`}>
                  {tip.icon}
                </div>
                <h3 className="font-semibold text-sm">{tip.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{tip.content}</p>
              
              {tip.hasMoreContent && (
                <button
                  onClick={() => handleReadMore(tip.fullFeedback)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-2"
                >
                  Read more →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Feedback Modal */}
      {showModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedFeedback.subject} - {selectedFeedback.assignment_title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-lg"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-1">Grade</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedFeedback.obtained_grade}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-1">Class</h3>
                  <p className="text-sm text-gray-600">{selectedFeedback.class_name}</p>
                </div>
              </div>

              {selectedFeedback.feedback && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Feedback</h3>
                  <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">
                    {selectedFeedback.feedback}
                  </p>
                </div>
              )}

              {selectedFeedback.corrections && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Corrections</h3>
                  <p className="text-gray-600 bg-yellow-50 p-3 rounded-lg">
                    {selectedFeedback.corrections}
                  </p>
                </div>
              )}

              {selectedFeedback.suggestions && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Suggestions</h3>
                  <p className="text-gray-600 bg-green-50 p-3 rounded-lg">
                    {selectedFeedback.suggestions}
                  </p>
                </div>
              )}

              {selectedFeedback.weaknesses && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Areas to Improve</h3>
                  <p className="text-gray-600 bg-red-50 p-3 rounded-lg">
                    {selectedFeedback.weaknesses}
                  </p>
                </div>
              )}

              {selectedFeedback.improvementAreas && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Improvement Areas</h3>
                  <p className="text-gray-600 bg-purple-50 p-3 rounded-lg">
                    {selectedFeedback.improvementAreas}
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Submitted on: {new Date(selectedFeedback.submission_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};