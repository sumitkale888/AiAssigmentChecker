import { useState, useEffect } from 'react';
import useFetch from "../../../../shared/hooks/UseFetch";

interface Assignment {
  assignment_id: number;
  title: string;
  description: string;
  deadline: string;
  created_date: string;
  points: number;
  class_id: number;
  class_name?: string;
  subject?: string;
  evaluation_guideline?: string;
  status?: 'pending' | 'overdue' | 'submitted' | 'graded';
  submission_id?: number;
  submission_date?: string;
  obtained_grade?: number;
  feedback?: string;
}

interface Props {
  classId?: number;
}

export function AssignmentsTable({ classId }: Props) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Fetch assignments based on whether classId is provided
  const assignmentsUrl = classId 
    ? `${import.meta.env.VITE_BACKEND_URL}/student/class/assignments/${classId}`
    : `${import.meta.env.VITE_BACKEND_URL}/student/assignments/student`;

  const { data: assignmentsData, status: assignmentsStatus } = useFetch<Assignment[]>({
    method: "GET",
    url: assignmentsUrl,
  });

  useEffect(() => {
    if (assignmentsData) {
      const enhancedAssignments = assignmentsData.map((assignment: Assignment) => {
        let status: Assignment['status'] = 'pending';
        const now = new Date();
        const deadline = new Date(assignment.deadline);

        // Determine status based on submission and deadline
        if (assignment.submission_id) {
          if (assignment.obtained_grade !== null && assignment.obtained_grade !== undefined) {
            status = 'graded';
          } else {
            status = 'submitted';
          }
        } else if (now > deadline) {
          status = 'overdue';
        } else {
          status = 'pending';
        }

        return {
          ...assignment,
          status,
        };
      });

      setAssignments(enhancedAssignments);
    }
  }, [assignmentsData]);

  const filterAssignments = () => {
    const now = new Date();
    return assignments.filter(assignment => {
      const deadline = new Date(assignment.deadline);
      if (activeTab === 'upcoming') {
        return deadline >= now || assignment.status === 'pending' || assignment.status === 'overdue';
      } else {
        return deadline < now && assignment.status !== 'pending';
      }
    });
  };

  const getStatusDisplay = (assignment: Assignment) => {
    switch (assignment.status) {
      case 'pending':
        return { text: '⏳ Pending', class: 'bg-yellow-100 text-yellow-800' };
      case 'overdue':
        return { text: '🔴 Overdue', class: 'bg-red-100 text-red-800' };
      case 'submitted':
        return { text: '✅ Submitted', class: 'bg-green-100 text-green-800' };
      case 'graded':
        return { text: '📝 Graded', class: 'bg-blue-100 text-blue-800' };
      default:
        return { text: '⏳ Pending', class: 'bg-yellow-100 text-yellow-800' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAssignments = filterAssignments();

  if (assignmentsStatus === "loading") {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">📚 Assignments</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 py-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (assignmentsStatus === "error") {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">📚 Assignments</h3>
        <div className="text-red-500 text-center py-4">Failed to load assignments</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">📚 Assignments</h3>
      <div className="w-full">
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'upcoming'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'past'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
        
        <div className="mt-4">
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No {activeTab} assignments found.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 border-b pb-2 border-gray-200">
                <div>Title</div>
                <div>Due Date</div>
                <div>Status</div>
              </div>
              
              {filteredAssignments.map((assignment) => {
                const statusInfo = getStatusDisplay(assignment);
                return (
                  <div
                    key={assignment.assignment_id}
                    className="grid grid-cols-3 gap-4 items-center py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{assignment.title}</div>
                      {assignment.class_name && (
                        <div className="text-xs text-gray-500">{assignment.class_name}</div>
                      )}
                      {assignment.description && assignment.description !== 'no description' && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {assignment.description}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>{formatDate(assignment.deadline)}</div>
                      {assignment.points && assignment.points > 0 && (
                        <div className="text-xs text-gray-500">{assignment.points} points</div>
                      )}
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}
                      >
                        {statusInfo.text}
                      </span>
                      {assignment.status === 'graded' && assignment.obtained_grade !== undefined && (
                        <div className="text-xs text-gray-500 mt-1">
                          Grade: {assignment.obtained_grade}/{assignment.points}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}