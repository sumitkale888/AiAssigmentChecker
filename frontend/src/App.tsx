
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SigninPage from './features/auth/signup/continer/SigninPage';
import SingupPage from './features/auth/signup/continer/SignupPage'

import DashboardPage from './shared/containers/DashboardPage';
function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/auth/signup" element={<SingupPage/>}></Route>
        <Route path="/auth/signin" element={<SigninPage/>}></Route>
        <Route path="/" element={<DashboardPage/>}></Route>
     
      </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
