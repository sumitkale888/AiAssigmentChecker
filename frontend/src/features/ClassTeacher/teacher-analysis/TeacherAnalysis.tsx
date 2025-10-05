// import { useState, useEffect } from "react";
// import { AssignmentsTable } from "./assignments-table/assignments-table";
// import { AttendanceTracker } from "./attendance/attendance-tracker";
// import { Leaderboard } from "./leaderboard/leaderboard";
// import { PerformanceChart } from "./performanceChart/performance-chart";
// import { TaskCompletionChart } from "./task_completion/task-completion-chart";
// import { ProductivityTips } from "./productivityTips/productivity-tips";

export default function TeacherAnalysis() {
  return (

    <>
    <div className="w-full rounded-l-4xl bg-gray-50 overflow-y-scroll p-6 h-[89vh]">
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
              {/* <PerformanceChart /> */}
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              {/* <TaskCompletionChart /> */}
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              {/* <AssignmentsTable /> */}
            </div>
          </div>

          {/* Right Column - Attendance, Leaderboard & Tips */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              {/* <AttendanceTracker /> */}
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              {/* <Leaderboard /> */}
            </div>
          </div>
            <div className="bg-white rounded-xl shadow-sm">
              {/* <ProductivityTips /> */}
            </div>
        </div>
      </div>
    </div>
    </>
  );
}

// import React from "react";
// import {
// Chart as ChartJS,
// CategoryScale,
// LinearScale,
// PointElement,
// LineElement,
// BarElement,
// Title,
// Tooltip,
// Legend,
// } from "chart.js";
// import { Line, Bar } from "react-chartjs-2";

// ChartJS.register(
// CategoryScale,
// LinearScale,
// PointElement,
// LineElement,
// BarElement,
// Title,
// Tooltip,
// Legend
// );

// // Classroom Overview Component
// const ClassroomOverview: React.FC = () => {
// const overviewData = [
// {
// title: "Total Students",
// value: 145,
// subtitle:
// "Outline icon of multiple human figures, representing a group of students, energetic style, composed with golden ratio and balanced negative space, minimal settings, no background",
// color: "#4a6cf7",
// },
// {
// title: "Avg Class Performance",
// value: "88%",
// subtitle:
// "Outline icon of a bar chart showing rising data, representing class performance, energetic style, composed with golden ratio and balanced negative space, minimal settings, no background",
// color: "#4caf50",
// },
// {
// title: "Pending Assignments",
// value: 12,
// subtitle:
// "Outline icon of a document with a warning sign, representing pending assignments, energetic style, composed with golden ratio and balanced negative space, minimal settings, no background",
// color: "#f59e0b",
// },
// {
// title: "Attendance Rate",
// value: "95%",
// subtitle:
// "Outline icon of a calendar with a checkmark, representing attendance rate, energetic style, composed with golden ratio and balanced negative space, minimal settings, no background",
// color: "#16a34a",
// },
// ];
// return (
// <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 my-6">
// {overviewData.map(({ title, value, subtitle, color }) => (
// <div
// key={title}
// className="rounded-lg p-5 border border-gray-200 shadow-sm"
// style={{ backgroundColor: ${color}10 }}
// >
// <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
// <p className="text-3xl font-bold" style={{ color }}>
// {value}
// </p>
// <p className="text-xs mt-1 text-gray-500">{subtitle}</p>
// </div>
// ))}
// </div>
// );
// };

// // Student Performance Analytics Component
// const StudentPerformanceAnalytics: React.FC = () => {
// // Line Chart data: Average and Max Scores by month
// const months = [
// "Jan",
// "Feb",
// "Mar",
// "Apr",
// "May",
// "Jun",
// "Jul",
// "Aug",
// "Sep",
// "Oct",
// "Nov",
// "Dec",
// ];
// const averageScores = [
// 180, 320, 250, 80, 200, 210, 250, 280, 320, 290, 330, 300,
// ];
// const maxScores = [90, 180, 120, 200, 180, 160, 170, 180, 210, 220, 230, 210];

// const lineData = {
// labels: months,
// datasets: [
// {
// label: "Average Score",
// data: averageScores,
// borderColor: "#4a6cf7",
// backgroundColor: "#4a6cf7",
// tension: 0.3,
// fill: false,
// pointRadius: 4,
// },
// {
// label: "Max Score",
// data: maxScores,
// borderColor: "#16a34a",
// backgroundColor: "#16a34a",
// tension: 0.3,
// fill: false,
// pointRadius: 4,
// },
// ],
// };
// const lineOptions = {
// responsive: true,
// plugins: {
// legend: { position: "top" as const },
// title: {
// display: true,
// text: "Average Class Performance Trend",
// font: { size: 16, weight: "bold" },
// },
// },
// scales: {
// y: {
// min: 0,
// max: 350,
// ticks: {
// stepSize: 85,
// },
// },
// },
// };

// // Bar Chart data: Assignment Marks Distribution
// const grades = ["A", "B", "C", "D", "F"];
// const studentsCount = [40, 65, 30, 10, 5];

// const barData = {
// labels: grades,
// datasets: [
// {
// label: "Students",
// data: studentsCount,
// backgroundColor: [
// "#3b82f6",
// "#22c55e",
// "#ef4444",
// "#f59e0b",
// "#3b82f6",
// ],
// },
// ],
// };
// const barOptions = {
// responsive: true,
// plugins: {
// legend: { display: false },
// title: {
// display: true,
// text: "Assignment Marks Distribution (Grades A-F)",
// font: { size: 16, weight: "bold" },
// },
// },
// scales: {
// y: {
// beginAtZero: true,
// max: 80,
// },
// },
// };

// return (
// <div className="flex flex-col md:flex-row gap-6 my-6">
// <div className="flex-1 border border-gray-200 rounded-lg p-4 shadow-sm">
// <Line data={lineData} options={lineOptions} />
// </div>
// <div className="w-full md:w-1/4 border border-gray-200 rounded-lg p-4 shadow-sm">
// <Bar data={barData} options={barOptions} />
// </div>
// </div>
// );
// };

// // Student Programs Participation Component
// const StudentProgramsParticipation: React.FC = () => {
// const programs = [
// { name: "Coding Club", count: 90, color: "#4a6cf7" },
// { name: "Sports Team", count: 120, color: "#16a34a" },
// { name: "Art Workshop", count: 75, color: "#d946ef" },
// { name: "Robotics Team", count: 35, color: "#fbbf24" },
// ];

// return (
// <div className="my-6">
// <h2 className="font-bold text-lg mb-3">Student Programs Participation</h2>
// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
// {programs.map(({ name, count, color }) => (
// <div
// key={name}
// className="p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between"
// style={{ borderColor: color }}
// >
// <span className="font-semibold text-gray-700">{name}</span>
// <span className="font-bold text-lg" style={{ color }}>
// {count}
// </span>
// </div>
// ))}
// </div>
// </div>
// );
// };