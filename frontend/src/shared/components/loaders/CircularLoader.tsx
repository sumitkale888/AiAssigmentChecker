import React from 'react';

// This component creates a classic spinning circular loader.
const CircularLoader: React.FC = () => {
  return (
    // The main container centers the loader on the screen with a white background.
    <div className="flex items-center justify-center  ">
      {/*
        The loader is a div with a rounded-full class to make it a circle.
        We create the spinning effect by giving it a transparent border
        on most sides and a solid, colored border on the top.
        The `animate-spin` class handles the continuous rotation.
      */}
      <div
        className="w-12 h-12 rounded-full border-4 border-transparent animate-spin"
        style={{ borderTopColor: 'rgb(43, 127, 255)' }}
      ></div>
    </div>
  );
};

export default CircularLoader;
