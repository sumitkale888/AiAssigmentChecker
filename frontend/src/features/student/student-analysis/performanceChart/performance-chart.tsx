import { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto';
import useFetch from "../../../../shared/hooks/UseFetch";

interface PerformanceData {
  subject: string;
  studentScore: number;
  classAverage: number;
  totalAssignments: number;
  submittedAssignments: number;
}

interface PerformanceResponse {
  studentPerformance: PerformanceData[];
  summary: {
    overallAverage: number;
    totalClasses: number;
    completedAssignments: number;
    totalAssignments: number;
  };
}

export const PerformanceChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [timeRange, setTimeRange] = useState("current-semester");
  
  const { data, status } = useFetch<PerformanceResponse>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/student/analytics/performance?period=${timeRange}`,
  });

  useEffect(() => {
    if (!chartRef.current || !data || data.studentPerformance.length === 0) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    Chart.getChart(chartRef.current)?.destroy();

    // Calculate dynamic Y-axis max
    const allScores = [
      ...data.studentPerformance.map(item => item.studentScore),
      ...data.studentPerformance.map(item => item.classAverage)
    ].filter(score => score !== null && score !== undefined);
    
    const maxScore = Math.max(...allScores);
    
    // Determine appropriate Y-axis max with some padding
    let yAxisMax = 100; // Default to 100%
    
    if (maxScore <= 20) {
      yAxisMax = 20;
    } else if (maxScore <= 50) {
      yAxisMax = 50;
    } else if (maxScore <= 75) {
      yAxisMax = 75;
    } else if (maxScore <= 100) {
      yAxisMax = 100;
    } else {
      // For scores above 100, add 10% padding
      yAxisMax = Math.ceil(maxScore * 1.1);
    }

    // Ensure yAxisMax is at least 10 for very low scores
    yAxisMax = Math.max(10, yAxisMax);

    // Prepare datasets with conditional coloring
    const studentScoresData = data.studentPerformance.map(item => item.studentScore);
    const classAveragesData = data.studentPerformance.map(item => item.classAverage);
    
    // Create colors based on score comparison
    const studentScoreColors = data.studentPerformance.map(item => 
      item.studentScore >= item.classAverage 
        ? 'rgba(34, 197, 94, 0.7)' // Green if student score is equal or higher
        : 'rgba(239, 68, 68, 0.7)' // Red if student score is lower
    );

    const studentBorderColors = data.studentPerformance.map(item => 
      item.studentScore >= item.classAverage 
        ? '#22c55e' // Green border
        : '#ef4444' // Red border
    );

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.studentPerformance.map(item => item.subject),
        datasets: [
          {
            label: 'Your Score',
            data: studentScoresData,
            backgroundColor: studentScoreColors,
            borderColor: studentBorderColors,
            borderWidth: 1
          },
          {
            label: 'Class Average',
            data: classAveragesData,
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
            max: yAxisMax,
            title: {
              display: true,
              text: 'Scores'
            },
            ticks: {
              callback: function(value) {
                return value + '';
              }
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
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}`;
              }
            }
          }
        }
      }
    });

    return () => chart.destroy();
  }, [data]);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };

  if (status === "loading") {
    return (
      <div className="bg-white rounded-xl p-11 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Academic Performance</h2>
          <select 
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
            value={timeRange}
            onChange={handleTimeRangeChange}
          >
            <option value="current-semester">This Semester</option>
            <option value="last-semester">Last Semester</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center">
          <p>Loading performance data...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-white rounded-xl p-11 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Academic Performance</h2>
          <select 
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
            value={timeRange}
            onChange={handleTimeRangeChange}
          >
            <option value="current-semester">This Semester</option>
            <option value="last-semester">Last Semester</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center">
          <p className="text-red-500">Failed to load performance data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-11 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Academic Performance</h2>
        <select 
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="current-semester">This Semester</option>
          <option value="last-semester">Last Semester</option>
          <option value="all-time">All Time</option>
        </select>
      </div>
      
      {data && data.studentPerformance.length > 0 ? (
        <>
          <div className="h-64 relative">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Overall Average: </span>
              <span>{data.summary.overallAverage.toFixed(1)}</span>
            </div>
            <div>
              <span className="font-medium">Assignments Completed: </span>
              <span>{data.summary.completedAssignments} of {data.summary.totalAssignments}</span>
            </div>
          </div>
          {/* Legend with color explanation */}
          <div className="mt-4 flex gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Your score ≥ Class average</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Your score Class average</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Class average</span>
            </div>
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p>No performance data available for this period.</p>
        </div>
      )}
    </div>
  );
};