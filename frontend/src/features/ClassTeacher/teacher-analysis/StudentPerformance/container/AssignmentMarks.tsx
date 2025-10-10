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
import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

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

const Assignment: React.FC = () => {
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
        align: "start",
        position: "top",
        font: { weight: "bold", size: 18 },
        color: "#374151",
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
    <div className="w-full md:w-1/3 flex justify-center items-center rounded-lg bg-white p-6 shadow-md border border-gray-200">
      <div className="w-full max-w-md">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default Assignment;
