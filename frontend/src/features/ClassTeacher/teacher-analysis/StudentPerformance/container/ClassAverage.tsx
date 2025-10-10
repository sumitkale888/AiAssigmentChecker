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
import { Line} from "react-chartjs-2";

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

const ClassAverage : React.FC = () => {
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
  return (
      <>
        <div className="flex-1 rounded-2xl bg-white p-6 shadow-md border border-gray-200">
          <Line data={lineData} options={lineOptions} />
        </div>
      </>
    );
}

export default ClassAverage;
