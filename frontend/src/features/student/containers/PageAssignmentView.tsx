import Header from '../../../shared/components/header/Header';
import PageList from '../../../shared/components/sidebar/PageList';
import SubmissionUpload from '../components/student-Assignment-view/SubmissionUpload';
import ContentAssignment from '../components/student-Assignment-view/ContentAssignment';

const PageAssignmentView = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="flex">
                <div className="flex items-center gap-4 cursor-pointer mb-1
                            transition-colors duration-200 ease-in-out
                            text-white font-semibold
                        ">
                    <PageList />
                </div>
                <div className="flex-1 bg-gray-100 p-6 rounded-tl-3xl">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-tl-2xl">
                        
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
                            <ContentAssignment />
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <SubmissionUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageAssignmentView;
