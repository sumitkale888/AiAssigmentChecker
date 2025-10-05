import { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto';
import useFetch from "../../../../shared/hooks/UseFetch";

interface ChartData {
  period: string;
  label: string;
  tasks_created: number;
  tasks_completed: number;
}

interface TaskStats {
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  completion_rate: number;
  average_grade: number;
}

interface TaskCompletionResponse {
  chartData: ChartData[];
  stats: TaskStats;
}

export const TaskCompletionChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [timeRange, setTimeRange] = useState("current-month");
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  const { data, status } = useFetch<TaskCompletionResponse>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/student/analytics/task-completion?period=${timeRange}`,
  });

  useEffect(() => {
    if (!chartRef.current || !data?.chartData) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy previous chart instance
    if (chartInstance) {
      chartInstance.destroy();
    }

    const labels = data.chartData.map(item => item.label);
    const completedData = data.chartData.map(item => item.tasks_completed);
    const createdData = data.chartData.map(item => item.tasks_created);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Tasks Completed',
            data: completedData,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
            tension: 0.3,
            fill: true,
            borderWidth: 2,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Tasks Assigned',
            data: createdData,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.05)',
            tension: 0.3,
            fill: true,
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: '#f59e0b',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
            title: {
              display: true,
              text: 'Number of Tasks'
            }
          },
          x: {
            title: {
              display: true,
              text: timeRange.includes('week') ? 'Days' : 'Weeks'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#1f2937',
            bodyColor: '#1f2937',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });

    setChartInstance(chart);

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data, timeRange]);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };

  if (status === "loading") {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Task Completion Rate</h2>
          <div className="animate-pulse">
            <div className="w-32 h-8 bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <div className="h-64 relative animate-pulse">
          <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Task Completion Rate</h2>
          <select 
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
            value={timeRange}
            onChange={handleTimeRangeChange}
            disabled
          >
            <option value="current-week">This Week</option>
            <option value="last-week">Last Week</option>
            <option value="current-month">This Month</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>
        <div className="h-64 relative flex items-center justify-center">
          <div className="text-center text-red-500">
            <p>Failed to load task completion data</p>
            <p className="text-sm text-gray-500 mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Task Completion Rate</h2>
          {data?.stats && (
            <div className="flex gap-4 mt-1 text-sm text-gray-600">
              <span>Completion: <strong className="text-green-600">{data.stats.completion_rate}%</strong></span>
              <span>Completed: <strong>{data.stats.completed_tasks}</strong> / <strong>{data.stats.total_tasks}</strong></span>
              {data.stats.average_grade > 0 && (
                <span>Avg Grade: <strong className="text-blue-600">{data.stats.average_grade}%</strong></span>
              )}
            </div>
          )}
        </div>
        <select 
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="current-week">This Week</option>
          <option value="last-week">Last Week</option>
          <option value="current-month">This Month</option>
          <option value="last-month">Last Month</option>
        </select>
      </div>
      
      <div className="h-64 relative">
        <canvas ref={chartRef}></canvas>
      </div>
      
      {data?.stats && data.stats.total_tasks === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium">No task data available</p>
            <p className="text-sm mt-1">Complete some assignments to see your progress</p>
          </div>
        </div>
      )}
    </div>
  );
};