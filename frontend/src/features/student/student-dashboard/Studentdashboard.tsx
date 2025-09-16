import React from 'react';
import Header from '../../../shared/components/header/Header';
import PageList from '../../../shared/components/sidebar/PageList';
// import UseProtectedPage from '../hooks/UseProtectedPage';
const StudentDashboardPage: React.FC = () => {
    return (
        <div>

            <Header/>
            <div className='flex'>
            <PageList userType='student' />
             <div className="relative w-full bg-gray-100 flex flex-col items-center justify-between rounded-[30px]">
                <h1 className="text-3xl font-bold text-gray-700 mt-8">Student Dashboard Page</h1>
            </div>    
            </div>
        </div>
    );
};

export default StudentDashboardPage;