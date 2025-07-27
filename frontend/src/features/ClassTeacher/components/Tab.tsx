import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTabStatus } from '../../../shared/slices/sharedSlice';

interface RootState {
  shared: {
    tabStatus: {
      activeTab: string;
    };
  };
}

interface TabProps {
    list: Array<{ item_name: string }>;
}

const Tab: React.FC<TabProps> = ({ list }) => {
    const dispatch = useDispatch();
    const activePage = useSelector((state: RootState) => state.shared.tabStatus.activeTab);

    const handleItemSelection = (itemName: string) => {
        console.log('state update'+activePage);
        dispatch(updateTabStatus({ activePage: itemName }));

    };

    const pageList = list;

    return (
        <div className="flex flex-row justify-center items-center p-2 bg-white rounded-[70px] shadow-md w-full max-w-lg mx-[15px] my-4">
            {pageList.map((item) => (
                <div
                    key={item.item_name}
                    onClick={() => handleItemSelection(item.item_name)}
                    className={`
                        flex-1 text-center py-2 px-4 rounded-[70px] cursor-pointer
                        transition-colors duration-200 ease-in-out
                        ${activePage === item.item_name
                            ? 'bg-blue-500 text-white font-semibold shadow-inner'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }
                    `}
                >
                    <span className="text-sm md:text-base">{item.item_name}</span>
                </div>
            ))}
        </div>
    );
};

export default Tab;