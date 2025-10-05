import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../../../shared/components/header/Header";
import PageList from "../../../shared/components/sidebar/PageList";
import TeacherAnalysis from "../teacher-analysis/TeacherAnalysis";
import { updatesidebarStatus } from "../../../shared/slices/sharedSlice";

// interface RootState {
//   shared: {
//     sidebarStatus: {
//       isOpen: boolean;
//     };
//   };
// }

const DashboardTeacherAnalysis = () => {
  const dispatch = useDispatch();

  // const isSidebarOpen = useSelector(
  //   (state: RootState) => state.shared.sidebarStatus.isOpen
  // );

  useEffect(() => {
    dispatch(updatesidebarStatus({ activePage: "Analysis" }));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="flex h-[89vh]">
        <PageList userType='student'/>
          <TeacherAnalysis />
          {/* <StudentAnalysis /> */}
      </div>
    </div>
  );
};

export default DashboardTeacherAnalysis;
