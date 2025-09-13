// import React from 'react';
// import Header from '../../../../shared/components/header/Header';
// import PageList from '../../../../shared/components/sidebar/PageList';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// } from "chart.js"
//  import { Bar, Line , Pie } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement    // ✅ Register line element
// );



// const Performance: React.FC = () => {
     
//    const subjectPerformanceData = {
//     labels: ["Math", "Science", "English", "History", "Computer"],
//     datasets: [
//       {
//         label: "Marks %",
//         data: [92, 85, 88, 95, 90],
//         backgroundColor: "rgba(54, 162, 235, 2)",
//       },
//     ],
//   };

//    // 🔹 Overall Attendance Data (Pie Chart)
//   // Example: Present = 88%, Absent = 12%
//    const testProgressData = {
//     labels: ["Test 1", "Test 2", "Midterm", "Test 3", "Final"],
//     datasets: [
//       {
//         label: "Student Score",
//         data: [70, 75, 80, 78, 85],
//         borderColor: "rgba(75, 192, 192, 2)",
//         backgroundColor: "rgba(75, 192, 192, 0.9)",
//         fill: true,
//         tension: 0.4,
//       },
//       {
//         label: "Class Average",
//         data: [65, 72, 77, 74, 80],
//         borderColor: "rgba(255, 159, 64, 1)",
//         backgroundColor: "rgba(255, 159, 64, 0.9)",
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const gradeDistributionData = {
//     labels: ["A Grade", "B Grade", "C Grade", "D Grade"],
//     datasets: [
//       {
//         data: [40, 30, 20, 10],
//         backgroundColor: [
//           "rgba(54, 162, 235, 2)",
//           "rgba(255, 206, 86, 2)",
//           "rgba(255, 99, 132, 2)",
//           "rgba(75, 192, 192, 2)",
//         ],
//         borderColor: [
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(255, 99, 132, 1)",
//           "rgba(75, 192, 192, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const subjectScores: Record<string, number> = {
//     Math: 92,
//     Science: 85,
//     English: 68,
//     History: 60,
//     Computer: 95,
//   };

//   const aiSuggestions: Record<string, string> = {
//     English:
//       "💡 Focus on grammar and vocabulary. Try reading one article daily.",
//     History:
//       "💡 Revise timelines and create flashcards for key events and dates.",
//   };


//   const weakTopics = Object.entries(subjectScores).filter(
//     ([, score]) => score < 75
//   );

//     return (
//         <div>
//             <Header/>
//             <div className='flex'>
//             <PageList />
//             <div className="w-full bg-gray-100 rounded-l-3xl">
//                 <h1 className="text-3xl text-gray-900 mt-8 px-10 py-2">Overall Performance</h1>
//                 <div className="p-6 px-30 gap-6 grid md:grid-cols-2 ">
//                 {/* 📊 Subject-wise Attendance */}
//                 <div className="bg-white shadow-lg rounded-2xl p-8 w-xl mb-8">
//                     <h2 className="text-xl font-semibold mb-4">Subject-wise Performance</h2>
//                     <div className="h-64 flex justify-center items-center">
//                     <Bar data={subjectPerformanceData}
//                         options={{ maintainAspectRatio: false }}
//                      />
//                     </div>
//                 </div>

//                 <div className="bg-white shadow-lg rounded-2xl p-8 w-xl mb-8">
//                     <h2 className="text-xl font-semibold mb-4">Test Progress Over Time</h2>
//                     <div className="h-64 flex justify-center items-center">
//                     <Line data={testProgressData} 
//                       options={{ maintainAspectRatio: false }}
//                       />
//                     </div>
//                 </div>

//                  <div className="bg-white shadow-lg rounded-2xl p-8 w-xl">
//                     <h2 className="text-xl font-semibold mb-4">Overall Grade Distribution</h2>
//                     <div className="h-72 flex justify-center items-center">
//                     <Pie data={gradeDistributionData}
//                     options={{ maintainAspectRatio: false }}
//                      />
//                     </div>
//                 </div>

//           <div className="p-0">
//             {/* 📉 Weak Topics */}
//             <div className="bg-white shadow-lg rounded-2xl p-8 w-xl h-96">
//               <h2 className="text-xl font-semibold mb-4">
//                 Weak Topics & AI Suggestions
//               </h2>
//               {weakTopics.length > 0 ? (
//                 <ul className="space-y-6">
//                   {weakTopics.map(([subject, score]) => (
//                     <li key={subject}>
//                       <div className="flex justify-between mb-1">
//                         <span>{subject}</span>
//                         <span>{score}%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
//                         <div
//                           className="bg-red-500 h-3 rounded-full"
//                           style={{ width: `${score}%` }}
//                         ></div>
//                       </div>
//                       <p className="text-sm text-gray-700 italic">
//                         {aiSuggestions[subject] ||
//                           "💡 Practice regularly and revise key concepts."}
//                       </p>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-green-600">🎉 No weak topics detected!</p>
//                   )}
//               </div>
//             </div>
//           </div>
//         </div>
//     </div>
// </div>
//     );
// };

// export default Performance;



