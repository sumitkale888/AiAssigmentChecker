import AssignmentHeader from "../create-assignement/AssignmentHeader";
import AssignmentForm from "../create-assignement/AssignmentForm";
import AssignmentSidebar from "../create-assignement/AssignmentSidebar";
import {useParams} from "react-router-dom";
const PageCreateAssignment:React.FC = ({})=>{
  const { class_id } = useParams<{ classId: string, class_id: string }>();
    return (
  <div>
    <AssignmentHeader class_id={String(class_id)}/>
    <div className="flex">
    <AssignmentForm />
    <AssignmentSidebar />

    </div>
  

  </div>
    )

}


export default PageCreateAssignment;