import React from 'react';
import HomeImg from '../../../assets/home.svg';
import SettingImg from '../../../assets/settings.svg';

import { useDispatch, useSelector } from 'react-redux';
import { updatesidebarStatus } from '../../slices/sharedSlice';

// Define the shape of your Redux state
interface RootState {
    shared: {
        sidebarStatus: {
            activePage: string;
        };
    };
}

const PageList = () => {
    const dispatch = useDispatch();
    // Assuming activePage for the sidebar is stored in state.shared.sidebarStatus.activePage
    const activePage = useSelector((state: RootState) => state.shared.sidebarStatus.activePage);

    const handleItemSelection = (itemName: string) => {
        console.log('state update');
        dispatch(updatesidebarStatus({ activePage: itemName }));
    };

    const pageList = [
        { item_name: 'Home', item_img: HomeImg },
        { item_name: 'Settings', item_img: SettingImg },
    ];

    return (
        <div className="w-64 p-4 bg-white rounded-lg shadow-lg flex flex-col min-h-screen">
            {pageList.map((item) => (
                <div
                    key={item.item_name}
                    onClick={() => handleItemSelection(item.item_name)}
                    className={`
                        flex items-center gap-3 p-3 rounded-md cursor-pointer mb-2
                        transition-colors duration-200 ease-in-out
                        ${activePage === item.item_name
                            ? 'bg-blue-600 text-white font-semibold shadow-inner'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }
                    `}
                >
                    <img
                        src={item.item_img}
                        className={`w-5 h-5 ${activePage === item.item_name ? 'filter brightness-0 invert' : ''}`}
                        alt={item.item_name}
                    />
                    <span className="text-sm md:text-base">{item.item_name}</span>
                </div>
            ))}
        </div>
    );
};

export default PageList;
