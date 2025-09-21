import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../shared/components/header/Header";
import PageList from "../../../shared/components/sidebar/PageList";
import StudentAnalysis from "../student-analysis/StudentAnalysis";
import { updatesidebarStatus } from "../../../shared/slices/sharedSlice";

interface RootState {
  shared: {
    sidebarStatus: {
      isOpen: boolean;
    };
  };
}

const DashboardStudentAnalysis = () => {
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector(
    (state: RootState) => state.shared.sidebarStatus.isOpen
  );

  useEffect(() => {
    dispatch(updatesidebarStatus({ activePage: "Analysis" }));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="flex h-[89vh]">
        <PageList userType="student" />
          <StudentAnalysis />
      </div>
    </div>
  );
};

export default DashboardStudentAnalysis;
