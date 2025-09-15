import { useParams } from "react-router-dom";
import Header from "../../../shared/components/header/Header";
import PageList from "../../../shared/components/sidebar/PageList";
import StudentSubmission from "../components/assignment-submission-view/StudentSubmission";
const DashboardStudentSubmission: React.FC = () => {
    const { class_id } = useParams<{ class_id: string }>();
    const { student_id } = useParams<{ student_id: string }>();

    return (
        <div>
            <Header />
            <div className="flex ">
                <PageList userType="student"/>
                <StudentSubmission class_id={class_id } student_id={student_id} />
            </div>
        </div>
    );
}


export default DashboardStudentSubmission;