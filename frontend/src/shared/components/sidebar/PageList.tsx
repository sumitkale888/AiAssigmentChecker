import HomeImg from '../../../assets/home.svg'
import SettingImg from '../../../assets/settings.svg'

import { useDispatch } from 'react-redux'
import { updatesidebarStatus } from '../../slices/sharedSlice'


const PageList = () => {

    const dispatch = useDispatch()
    const handleItemSelection = (itemName:string)=>{
      console.log('state update')
       dispatch(updatesidebarStatus({activePage:itemName}))
    }

    const pageList = [{item_name:'Home',item_img:HomeImg}, {item_name:'Settings',item_img:SettingImg},]
    return (
       <div className="w-[200px] p-4 ">
      {pageList.map((item) => (
        <div
          key={item.item_name}
          onClick={()=>handleItemSelection(item.item_name)}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer shadow-sm mb-2"
        >
          <img
            src={item.item_img}
            className="w-5 h-5"
            alt={item.item_name}
          />
          <span className="text-gray-800 font-medium">{item.item_name}</span>
        </div>
      ))}
    </div>
    )
}

export default PageList