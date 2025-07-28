import { useParams } from "react-router-dom";
import Header from "../../../shared/components/header/Header";
import PageList from "../../../shared/components/sidebar/PageList";
import StudentSubmission from "../components/assignment-submission-view/StudentSubmission";
const DashboardStudentSubmission: React.FC = () => {
    const { class_id } = useParams<{ class_id: string }>();

    return (
        <div>
            <Header />
            <div className="flex ">
                <PageList />
                <StudentSubmission class_id={Number(class_id)} student_id={1} />
            </div>
        </div>
    );
}


export default DashboardStudentSubmission;