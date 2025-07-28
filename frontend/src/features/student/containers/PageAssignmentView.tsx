import PageList from '../../../shared/components/sidebar/PageList';
import SubmissionUpload from '../components/student-Assignment-view/SubmissionUpload';
import ContentAssignment from '../components/student-Assignment-view/ContentAssignment';
const PageAssignmentView = () => {
    return (
        <div>
            <Header />
            <div className='flex'>
                    <PageList />
                <div className='flex'>
                    <ContentAssignment />
                    <SubmissionUpload />
                </div>

                        </div>

        </div>
    );
};
