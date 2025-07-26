import useFetch from "../../../../shared/hooks/UseFetch";
import { useParams } from "react-router-dom";

const SubmissionUpload:React.FC = ()=>{
    const { assignment_id } = useParams()
    return(
        <div>
            <div>
                submission Display
            </div>
            <div>
                <button>
                    submit
                </button>
            </div>
        </div>

    )
}

export default SubmissionUpload;