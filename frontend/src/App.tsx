
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SigninPage from './features/auth/signup/continer/SigninPage';
import SingupPage from './features/auth/signup/continer/SignupPage'

import DashboardPage from './shared/containers/DashboardPage';
import DashboardTeacherClassPage from './features/ClassTeacher/container/DashboardTeacherClassPage'
import PageCreateAssignment from './features/ClassTeacher/container/PageCreateAssignment';

import PageAssignmentView from "./features/student/containers/PageAssignmentView";
import DashboardStudentClassPage from './features/student/containers/DashboardStudentClassPage';
import DashboardPageStudent from './features/student/containers/DashboardPageStudent';
function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>

        {/* ----------AUTH ROUTES-------------- */}
        <Route path="/auth/signup" element={<SingupPage/>}></Route>
        <Route path="/auth/signin" element={<SigninPage/>}></Route>
        <Route path="/" element={<SigninPage/>}></Route>
        {/* ----------TEACHER ROUTES-------------- */}

        <Route path="/teacher" element={<DashboardPage/>}></Route>
        <Route path="/teacher/class/:class_id" element={<DashboardTeacherClassPage/>}></Route>
        <Route path="/teacher/class/:class_id/assignment/create" element={<PageCreateAssignment/>}></Route>
        {/* <Route path="/student" element={<DashboardPage/>}></Route> */}

        {/* --------------STUDENTS ROUTES --------------------*/}

        <Route path="/student" element={<DashboardPageStudent/>}></Route>
        <Route path="/student/class/:class_id" element={<DashboardStudentClassPage/>}></Route>
        <Route path="/student/assignment/:assignment_id" element={<PageAssignmentView/>}></Route>
      </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
