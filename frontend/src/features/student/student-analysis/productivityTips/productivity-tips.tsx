export const ProductivityTips = () => {
  const tips = [
    {
      icon: '⏰',
      color: 'indigo',
      title: 'Time Management',
      content: "Based on your patterns, you're most productive between 9:00 AM - 11:30 AM. Schedule your most important tasks during this window."
    },
    {
      icon: '🧠',
      color: 'green',
      title: 'Focus Areas',
      content: "You complete coding tasks 23% faster than documentation. Consider pairing with someone who excels in documentation."
    },
    {
      icon: '☕',
      color: 'yellow',
      title: 'Wellness',
      content: "Your productivity dips after 2 hours of continuous work. Try the Pomodoro technique with 25-minute focused sessions."
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden w-[80rem] h-[20rem]">
      <div className="flex items-center gap-3 p-5 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
          💡
        </div>
        <h2 className="text-lg font-semibold text-gray-900">AI Feedback Tips</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 h-[14rem]">
        {tips.map((tip, index) => (
          <div key={index} className={`p-4 rounded-lg ${
            tip.color === 'indigo' ? 'bg-indigo-50' : 
            tip.color === 'green' ? 'bg-green-50' : 'bg-yellow-50'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
                tip.color === 'indigo' ? 'bg-indigo-600' : 
                tip.color === 'green' ? 'bg-green-600' : 'bg-yellow-600'
              }`}>
                {tip.icon}
              </div>
              <h3 className="font-semibold">{tip.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};