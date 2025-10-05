import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentPerformanceAnalytics: React.FC = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const averageScores = [180, 320, 250, 80, 200, 210, 250, 280, 320, 290, 330, 300];
  const maxScores = [90, 180, 120, 200, 180, 160, 170, 180, 210, 220, 230, 210];

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Average Score",
        data: averageScores,
        borderColor: "#4f46e5",
        backgroundColor: "#6366f1",
        tension: 0.3,
        fill: false,
        pointRadius: 5,
      },
      {
        label: "Max Score",
        data: maxScores,
        borderColor: "#16a34a",
        backgroundColor: "#22c55e",
        tension: 0.3,
        fill: false,
        pointRadius: 5,
      },
    ],
  };
  const lineOptions:ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const, labels: { font: { weight: "bold" } } },
      title: {
        display: true,
        text: "Average Class Performance Trend",
        font: { size: 18, weight: "bold" },
        color: "#374151",
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 350,
        ticks: { stepSize: 85 },
        grid: { color: "#e5e7eb" },
      },
      x: {
        grid: { color: "#e5e7eb" },
      },
    },
    interaction: {
      mode: "nearest" as const,
      intersect: false,
    },
  };

  const grades = ["A", "B", "C", "D", "F"];
  const studentsCount = [40, 65, 30, 10, 5];

  const barData = {
    labels: grades,
    datasets: [
      {
        label: "Students",
        data: studentsCount,
        backgroundColor: [
          "#2563eb", // Blue
          "#16a34a", // Green
          "#dc2626", // Red
          "#fbbf24", // Yellow
          "#6b7280", // Gray
        ],
        borderRadius: 4,
      },
    ],
  };
  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Assignment Marks Distribution (Grades A-F)",
        font: { weight: "bold", size: 18 },
        color: "#374151",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 80,
        ticks: { stepSize: 10 },
        grid: { color: "#e5e7eb" },
      },
      x: {
        grid: { color: "#e5e7eb" },
      },
    },
  };

  return (
    <>
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Programs Analysis</h2>
    <div className="flex flex-col md:flex-row gap-8 mb-12">
      <div className="flex-1 rounded-2xl bg-white p-6 shadow-md border border-gray-200">
        <Line data={lineData} options={lineOptions} />
      </div>
      <div className="w-full md:w-1/3 items-center rounded-lg bg-white p-6 shadow-md border border-gray-200">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
    </>
  );
};

export default StudentPerformanceAnalytics;