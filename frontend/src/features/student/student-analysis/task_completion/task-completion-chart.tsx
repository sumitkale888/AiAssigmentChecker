import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

export const TaskCompletionChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
          {
            label: 'Tasks Completed',
            data: [18, 22, 19, 25, 28],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
            tension: 0.3,
            fill: true,
            borderWidth: 2
          },
          {
            label: 'Tasks Created',
            data: [20, 25, 22, 28, 30],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.05)',
            tension: 0.3,
            fill: true,
            borderWidth: 2,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Task Completion Rate</h2>
        <select className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>
      <div className="h-64 relative">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};