import { useNavigate } from "react-router-dom"
import addImg from "../../../../assets/add-svgrepo-com.svg"
import AllAttendaceClass from "./AllAttendaceClass"
const ClassAttendance: React.FC<{ class_id: string }> = ({ class_id }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-[70px] hover:bg-blue-700 m-2.5"
                onClick={() => navigate(`/teacher/attendance/class/${class_id}`)}
            >
                Take Attendance
                <img src={addImg} alt="add" className="w-[15px]" />
            </button>
            
            <AllAttendaceClass class_id={class_id} />
        </div>
    )
}
export default ClassAttendance;