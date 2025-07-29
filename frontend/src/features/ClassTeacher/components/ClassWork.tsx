import addImg from "../../../assets/add-svgrepo-com.svg"
import useFetch from "../../../shared/hooks/UseFetch"
import { useNavigate } from "react-router-dom"
import AssignmentList from "./AssignmentList"

const ClassWork: React.FC<{ class_id: string | undefined }> = ({ class_id }) => {
    const navigate = useNavigate();
    const { data, error, status } = useFetch<any>({ method: "GET", url: `http://localhost:3000/api/class/assignments/${class_id}` })
        if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (status === "error") {
        return <div>Error loading data: {error && error.message ? error.message : String(error)}</div>;
    }
    return (
        <div>
            <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-[70px] hover:bg-blue-700 m-2.5"
                onClick={() => navigate(`/teacher/class/${class_id}/assignment/create`)}
            >
                Assignment
                <img src={addImg} alt="add" className="w-[15px]" />
            </button>
            {data && <AssignmentList assignments={data} />}
        </div>
    )

}

export default ClassWork