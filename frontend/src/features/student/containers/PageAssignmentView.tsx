import PageList from '../../../shared/components/sidebar/PageList';
import SubmissionUpload from '../components/student-Assignment-view/SubmissionUpload';
import ContentAssignment from '../components/student-Assignment-view/ContentAssignment';
import Header from '../../../shared/components/header/Header';
const PageAssignmentView = () => {
    return (
        <div>
            <Header />
            <div className='flex'>
                    <PageList userType="student"/>
                <div className="flex w-full p-2 rounded-l-4xl justify-center items-start">
                    <div className="flex w-full max-w-6xl">
                        <ContentAssignment />
                        <SubmissionUpload />
                    </div>
                </div>

            </div>

        </div>
    );
};
export default PageAssignmentView;