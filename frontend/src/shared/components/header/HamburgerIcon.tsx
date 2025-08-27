import React, { useState } from "react";

const HamburgerIcon: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="w-8 h-8 flex flex-col justify-around cursor-pointer ml-4"
      onClick={() => setOpen(!open)}
      aria-label="Toggle menu"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
    >
      <span
        className={`block h-1 w-full bg-gray-500 rounded transform transition duration-300 ease-in-out origin-left ${
          open ? "rotate-45 translate-y-3" : ""
        }`}
      />
      <span
        className={`block h-1 w-full bg-gray-500 rounded transition-opacity duration-300 ease-in-out ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block h-1 w-full bg-gray-500 rounded transform transition duration-300 ease-in-out origin-left ${
          open ? "-rotate-45 -translate-y-3" : ""
        }`}
      />
    </div>
  );
};

export default HamburgerIcon;
