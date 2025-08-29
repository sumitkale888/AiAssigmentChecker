import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from '../../slices/sharedSlice';

interface RootState {
    shared: {
        sidebarStatus: {
            isOpen: boolean;
        };
    };
}

const HamburgerIcon: React.FC = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.shared.sidebarStatus.isOpen);
  return (
    <div
      className="w-8 h-8 flex flex-col justify-around cursor-pointer ml-4"
      onClick={() => dispatch(toggleSidebar())}
      aria-label="Toggle menu"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && dispatch(toggleSidebar())}
    >
      <span
        className={`block h-1 w-full bg-gray-400 rounded transform transition duration-300 ease-in-out origin-left ${
          isOpen ? "rotate-45 translate-y-3" : ""
        }`}
      />
      <span
        className={`block h-1 w-full bg-gray-400 rounded transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block h-1 w-full bg-gray-400 rounded transform transition duration-300 ease-in-out origin-left ${
          isOpen ? "-rotate-45 -translate-y-3" : ""
        }`}
      />
    </div>
  );
};

export default HamburgerIcon;
