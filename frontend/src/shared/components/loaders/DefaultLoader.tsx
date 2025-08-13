// src/components/AnimatedLoader.tsx

import React from 'react';

// This component uses Tailwind CSS for all its styling.
const AnimatedLoader: React.FC = () => {
  return (
    // The main container centers the loader on the screen and now has a white background.
    <div className="flex items-center justify-center">
      <div className="flex space-x-2">
        {/*
          Each dot is a simple div. We use a keyframe animation
          called 'bounce' and apply a delay to each subsequent dot
          to create the cascading effect. The color is set using an
          inline style for precise control.
        */}
        <div
          className="w-4 h-4 rounded-full animate-bounce"
          style={{ backgroundColor: 'rgb(43, 127, 255)', animationDelay: '-0.32s' }}
        ></div>
        <div
          className="w-4 h-4 rounded-full animate-bounce"
          style={{ backgroundColor: 'rgb(43, 127, 255)', animationDelay: '-0.16s' }}
        ></div>
        <div
          className="w-4 h-4 rounded-full animate-bounce"
          style={{ backgroundColor: 'rgb(43, 127, 255)', animationDelay: '0s' }}
        ></div>
      </div>
    </div>
  );
};

export default AnimatedLoader;