import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../../shared/components/header/Header';
import PageList from '../../../shared/components/sidebar/PageList';
import StudentAnalysis from '../student-analysis/StudentAnalysis';
import { updatesidebarStatus } from '../../../shared/slices/sharedSlice';

const DashboardStudentAnalysis = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatesidebarStatus({ activePage: 'Analysis' }));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="flex">
        <PageList userType="student" />
        <StudentAnalysis/>
      </div>
    </div>
  );
};

export default DashboardStudentAnalysis;