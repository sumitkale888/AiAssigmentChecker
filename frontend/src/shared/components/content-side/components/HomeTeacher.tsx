import addImg from '../../../../assets/add-svgrepo-com.svg'
import ClassCard from '../../cards/ClassCard'
const HomeTeacher =()=>{
    return(
<div>
  <div>
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 m-2.5">
      Create Class
      <img src={addImg} alt="add" className="w-[15px]" />
    </button>
    <ClassCard classNameText={'myClass'}/>
  </div>
</div>


    )
}

export default HomeTeacher