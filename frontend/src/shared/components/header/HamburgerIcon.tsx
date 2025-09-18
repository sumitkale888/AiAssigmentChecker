import React from "react";
import { useDispatch} from "react-redux";
import { toggleSidebar } from '../../slices/sharedSlice';


const HamburgerIcon: React.FC = () => {
    const dispatch = useDispatch();
  return (
    <div
      className="w-8 h-4 flex flex-col justify-around cursor-pointer ml-7 group"
      onClick={() => dispatch(toggleSidebar())}
      aria-label="Toggle menu"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && dispatch(toggleSidebar())}
    >
      <span
      className={`block h-0.5 w-2/3 bg-gray-600 rounded transform transition duration-300 ease-in-out origin-left group-hover:bg-gray-800`}
      />
      <span
      className={`block h-0.5 w-2/3 bg-gray-600 rounded transition-opacity duration-300 ease-in-out group-hover:bg-gray-800`}
      />
      <span
      className={`block h-0.5 w-2/3 bg-gray-600 rounded transform transition duration-300 ease-in-out origin-left group-hover:bg-gray-800`}
      />
    </div>
  );
};

export default HamburgerIcon;
