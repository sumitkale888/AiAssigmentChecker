import { useNavigate } from "react-router-dom"
import addImg from "../../../../assets/add-svgrepo-com.svg"
import AllAttendaceClass from "./AllAttendaceClass"
import { useState } from "react"

const ClassAttendance: React.FC<{ class_id: string }> = ({ class_id }) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState("")

    const handleNavigate = () => {
        if (!mode) return;
        if (mode === "checklist") {
            navigate(`/teacher/checklist_attendance/class/${class_id}`)
        } else if (mode === "biometric") {
            navigate(`/teacher/biometric_attendance/class/${class_id}`)
        }
    }

    return (
        <div>
            <div className="flex gap-2 m-2.5">
                <button
                    className={`px-4 py-2 rounded-lg ${mode === "checklist" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setMode("checklist")}
                >
                    Checklist
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${mode === "biometric" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setMode("biometric")}
                >
                    Biometric
                </button>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                    disabled={!mode}
                    onClick={handleNavigate}
                >
                    Take Attendance
                    <img src={addImg} alt="add" className="w-[15px]" />
                </button>
            </div>
            <AllAttendaceClass class_id={class_id} />
        </div>
    )
}
export default ClassAttendance;
