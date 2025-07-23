import addImg from "../../../assets/add-svgrepo-com.svg"
import useFetch from "../../../shared/hooks/UseFetch"
import { useNavigate } from "react-router-dom"

const ClassWork: React.FC<{ class_id: string | undefined }> = ({ class_id }) => {
    const navigate = useNavigate();
    const { data, error, status } = useFetch<any>({ method: "GET", url: `http://localhost:3000/api/class/assignments/${class_id}` })
    return (
        <div>
            <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 m-2.5"
                onClick={() => navigate(`/teacher/class/${class_id}/assignment/create`)}
            >
                Assignment
                <img src={addImg} alt="add" className="w-[15px]" />
            </button>
            {JSON.stringify(data)}
        </div>
    )

}

export default ClassWork