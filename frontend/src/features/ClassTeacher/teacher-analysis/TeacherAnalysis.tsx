import React from "react";
import ClassroomOverview from "./classroomOverview/ClassroomOverview";
import StudentPerformanceAnalytics from "./StudentPerformance/StudentPerformance";
import StudentProgramsParticipation from "./StudentPrograms/StudentPrograms";
// Student Performance Analytics with charts

const TeacherAnalysis: React.FC = () => {
  return (
    <main className="w-full p-8 bg-gray-50 rounded-4xl overflow-y-scroll">
      <section aria-label="Classroom Overview">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Classroom Overview</h2>
        <ClassroomOverview />
      </section>

      <section aria-label="Student Performance Analytics">
        <StudentPerformanceAnalytics />
      </section>

      <section aria-label="Student Programs Participation">
        <StudentProgramsParticipation />
      </section>
    </main>
  );
};

export default TeacherAnalysis;
