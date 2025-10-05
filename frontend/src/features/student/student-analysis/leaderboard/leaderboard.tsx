import useFetch from "../../../../shared/hooks/UseFetch";
import { useState } from "react";

interface LeaderboardStudent {
  rank: number;
  student_id: number;
  name: string;
  avatar: string;
  badges: string[];
  metrics: {
    average_grade: number;
    submission_rate: number;
    attendance_rate: number;
    total_points: number;
  };
}

interface Props {
  classId?: number;
  limit?: number;
}

export function Leaderboard({ classId, limit = 8 }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const leaderboardUrl = classId 
    ? `${import.meta.env.VITE_BACKEND_URL}/student/leaderboard?class_id=${classId}`
    : `${import.meta.env.VITE_BACKEND_URL}/student/leaderboard`;

  const { data: leaderboardData, status } = useFetch<LeaderboardStudent[]>({
    method: "GET",
    url: leaderboardUrl,
  });

  // Apply limit and create slides
  const displayData = limit && leaderboardData 
    ? leaderboardData.slice(0, limit)
    : leaderboardData;

  const studentsPerSlide = 4;
  const totalSlides = displayData ? Math.ceil(displayData.length / studentsPerSlide) : 0;
  const currentStudents = displayData 
    ? displayData.slice(currentSlide * studentsPerSlide, (currentSlide * studentsPerSlide) + studentsPerSlide)
    : [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Get initial letter for avatar
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Get random color based on name for consistent avatar colors
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-orange-500', 'bg-teal-500', 'bg-indigo-500', 'bg-red-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (status === "loading") {
    return (
      <div className="">
        <div className="p-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">🏆 Leaderboard</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-200">
                <div className="animate-pulse flex items-center gap-3 w-full">
                  <div className="w-6 h-4 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="">
        <div className="p-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">🏆 Leaderboard</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-center text-red-500 py-4">
            Failed to load leaderboard data
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="p-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">🏆 Leaderboard</h3>
          {totalSlides > 1 && (
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                disabled={totalSlides <= 1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                disabled={totalSlides <= 1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
        {classId && (
          <p className="text-sm text-gray-600">Class Rankings</p>
        )}
      </div>
      <div className="p-6 pt-0">
        {!displayData || displayData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No leaderboard data available yet.
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentStudents.map((student) => (
                <div 
                  key={student.student_id} 
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-200 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-600 w-6">
                    {student.rank}.
                  </div>
                  <div className={`w-8 h-8 rounded-full ${getAvatarColor(student.name)} flex items-center justify-center text-white text-sm font-bold`}>
                    {getInitial(student.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {student.name}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.badges.slice(0, 2).map((badge, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                      {student.badges.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{student.badges.length - 2}
                        </span>
                      )}
                    </div>
                    {student.metrics && (
                      <div className="flex gap-3 mt-2 text-xs text-gray-500">
                        <span>Avg: {student.metrics.average_grade}%</span>
                        <span>Sub: {student.metrics.submission_rate}%</span>
                        <span>Att: {student.metrics.attendance_rate}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slide indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {limit && leaderboardData && leaderboardData.length > limit && (
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Full Leaderboard →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}