import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ClassCardProps {
  classNameText: string;
  class_id: string;
  backgroundImage?: string;
}

// All Tailwind 500-shade colors
const colorOptions = [
  'bg-blue-500',
  'bg-red-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-lime-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-violet-500',
  'bg-fuchsia-500',
  'bg-rose-500'
];

const ClassCard: React.FC<ClassCardProps> = ({ classNameText, class_id, backgroundImage }) => {
  const navigate = useNavigate();
  
  // Randomly select a color class
  const randomColorClass = colorOptions[Math.floor(Math.random() * colorOptions.length)];
  
  const handleCardClick = () => {
    navigate(`/teacher/class/${class_id}`);
  };

  return (
    <div className="w-72 bg-white rounded-3xl border border-gray-300 shadow-md overflow-hidden font-inter cursor-pointer" onClick={handleCardClick}>
      <div
        className={`relative w-full rounded-t-3xl ${randomColorClass} bg-cover bg-center flex flex-col justify-between p-4 text-white`}
        style={{
          height: '100px',
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        }}
      >
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-blue-200 opacity-80" 
            style={{ transform: 'rotate(-15deg)' }} 
          >
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 3.694-9.75 8.25 0 1.06.20 2.071.581 3.003L3 15.75l-1.559 1.559A2.25 2.25 0 0 0 1.5 21.75h19.5a2.25 2.25 0 0 0 1.559-4.441L21 15.75l-.331-.747A8.47 8.47 0 0 0 21.75 10.5c0-4.556-4.365-8.25-9.75-8.25ZM6.75 10.5a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H6.75Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H6.75Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H9Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H9Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H11.25Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H11.25Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H13.5Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H13.5Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H15.75Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H15.75Z" clipRule="evenodd" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold mt-auto mb-1 ml-2">
          {classNameText}
        </h2>

        <div className="w-full h-2"></div>
      </div>

      <div className="flex-grow bg-white p-4 flex flex-col justify-end h-[150px]">
        <div className="flex justify-end space-x-4 text-gray-500">
        </div>
      </div>
    </div>
  );
};

export default ClassCard;