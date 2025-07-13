import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SigninPage from './features/auth/signup/continer/SigninPage';
import SingupPage from './features/auth/signup/continer/SignupPage'
function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/auth/signup" element={<SingupPage/>}></Route>
        <Route path="/auth/signin" element={<SigninPage/>}></Route>
        <Route path="/" element={<SingupPage/>}></Route>
     
      </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
