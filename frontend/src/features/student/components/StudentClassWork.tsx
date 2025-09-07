// import addImg from "../../../assets/add-svgrepo-com.svg"
import useFetch from "../../../shared/hooks/UseFetch"
// import { useNavigate } from "react-router-dom"
// import AssignmentList from "./AssignmentList"
import StudentAssigmentList from "./StudentAssigmentList"
import AnimatedLoader from "../../../shared/components/loaders/DefaultLoader"

const StudentClassWork: React.FC<{ class_id: string | undefined }> = ({ class_id }) => {
    // const navigate = useNavigate();
    const { data,status } = useFetch<any>({ method: "GET", url: `${import.meta.env.VITE_BACKEND_URL}/student/class/assignments/${class_id}` })
     if (status === "loading") {
        return <div className=" mt-[300px] ">
            <AnimatedLoader />
        </div>;
    }
    return (
        <div>
 
            {data && <StudentAssigmentList assignments={data} />}
        </div>
    )

}

export default StudentClassWork