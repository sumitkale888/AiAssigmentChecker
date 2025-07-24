import React from 'react';
import Header from '../../../shared/components/header/Header';
import PageList from '../../../shared/components/sidebar/PageList';
import PagecontentSide from '../../../shared/components/content-side/container/PagecontentSide';
const DashboardPageStudent = () => {
  return (
   <div>
            <Header/>
            <div className='flex'>
            <PageList />
            <PagecontentSide/>
            </div>

        </div>
  );
};

export default DashboardPageStudent;
