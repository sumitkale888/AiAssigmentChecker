import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

export const PerformanceChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Math', 'Science', 'History', 'English', 'Programming'],
        datasets: [
          {
            label: 'Your Score',
            data: [85, 78, 92, 88, 95],
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
            borderColor: '#22c55e',
            borderWidth: 1
          },
          {
            label: 'Class Average',
            data: [76, 72, 85, 80, 82],
           backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: '#60a5fa',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Scores (%)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Subject-wise Performance'
          }
        }
      }
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="bg-white rounded-xl p-11 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Academic Performance</h2>
        <select className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white">
          <option>This Semester</option>
          <option>Last Semester</option>
          <option>All Time</option>
        </select>
      </div>
      <div className="h-64 relative">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};