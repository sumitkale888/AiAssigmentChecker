// import { useState, useEffect } from "react";
import { AssignmentsTable } from "./assignments-table/assignments-table";
import { AttendanceTracker } from "./attendance/attendance-tracker";
import { Leaderboard } from "./leaderboard/leaderboard";
import { PerformanceChart } from "./performanceChart/performance-chart";
import { TaskCompletionChart } from "./task_completion/task-completion-chart";
import { ProductivityTips } from "./productivityTips/productivity-tips";

export default function StudentAnalysis() {
  return (
    <div className="w-full bg-gray-50 min-h-screen p-6 rounded-l-4xl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Analysis</h1>
          <p className="text-gray-600">Track your academic progress and performance insights</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Performance Charts */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              <PerformanceChart />
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              <TaskCompletionChart />
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              <AssignmentsTable />
            </div>
          </div>

          {/* Right Column - Attendance, Leaderboard & Tips */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              <AttendanceTracker />
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              <Leaderboard />
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              <ProductivityTips />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
