import React from 'react';
import Header from '../components/header/Header';
import PageList from '../components/sidebar/PageList';
import PagecontentSide from '../components/content-side/container/PagecontentSide';
const DashboardPage: React.FC = () => {
    return (
        <div>
            <Header/>
            <div className='flex'>
            <PageList />
            <PagecontentSide/>
            </div>


            
            
            {/* Add dashboard content here */}
        </div>
    );
};

export default DashboardPage;