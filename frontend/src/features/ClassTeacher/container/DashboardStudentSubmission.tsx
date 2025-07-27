import { useParams } from "react-router-dom";
import Header from "../../../shared/components/header/Header";
import PageList from "../../../shared/components/sidebar/PageList";
import StudentSubmission from "../components/assignment-submission-view/StudentSumbission";
const DashboardTeacherClassPage: React.FC = () => {
    const { class_id } = useParams<{ classId: string, class_id: string }>();

    return (
        <div>
            <Header />
            <div className="flex ">
                <PageList />
                <StudentSubmission />
            </div>
        </div>
    );
}


export default DashboardTeacherClassPage;