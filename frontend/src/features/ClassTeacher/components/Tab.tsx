import { useDispatch } from 'react-redux'
import { updateTabStatus } from '../../../shared/slices/sharedSlice'

interface TabProps {
  list: Array<{ item_name: string }>
}

const Tab: React.FC<TabProps> = ({ list }) => {
  const dispatch = useDispatch()

  const handleItemSelection = (itemName: string) => {
    console.log('state update')
    dispatch(updateTabStatus({ activePage: itemName }))
  }

  const pageList = list
  // const pageList = [{ item_name: 'Section' }, { item_name: 'Assignments' }]
  return (
    <div className="w-[200px] p-4 flex">
      {pageList.map((item) => (
        <div
          key={item.item_name}
          onClick={() => handleItemSelection(item.item_name)}
          className=" gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer shadow-sm mb-2 "
        >

          <span className="text-gray-800 font-medium">{item.item_name}</span>
        </div>
      ))}
    </div>
  )
}

export default Tab;