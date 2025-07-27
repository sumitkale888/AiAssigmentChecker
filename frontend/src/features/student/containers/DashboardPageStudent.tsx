import React from 'react';
import Header from '../../../shared/components/header/Header';
import PageList from '../../../shared/components/sidebar/PageList';
// import PagecontentSide from '../../../shared/components/content-side/container/PagecontentSide';
import PagecontentSideStudent from './PagecontentSideStudent';
const DashboardPageStudent = () => {
  return (
   <div>
            <Header/>
            <div className='flex '>
            <PageList />
            <PagecontentSideStudent/>
            </div>

        </div>
  );
};

export default DashboardPageStudent;
