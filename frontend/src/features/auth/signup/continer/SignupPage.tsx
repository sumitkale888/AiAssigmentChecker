import { useState } from 'react'

import SignupTeacher from "../component/SignupTeacher"
import SignupStudent from "../component/SignupStudent"


const SignupPage = () => {
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const handleRole = () => {
    if (role == 'student') {
      setRole('teacher')
    } else {
      setRole('student')
    }
  }

  return (
    <>
      

      <div className="mx-auto relative">
        {role === 'student' ? (
          <SignupStudent />

        ) : (
          <SignupTeacher />
        )}
        <div className="flex flex-col items-center ">
        
        <button
          onClick={handleRole}
          className="px-2 py-2 underline cursor-pointer text-blue-600 rounded transition-colors absolute top-8 right-160 m-4"
        >
          {role === 'student' ? 'Teacher Signup?' : 'Student Signup?'}
        </button>
      </div>
      </div>
      
    </>
  );
}

export default SignupPage