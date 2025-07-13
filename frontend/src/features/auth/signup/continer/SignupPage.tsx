import type {FC,FormEvent} from 'react'
import { useState } from 'react'

import SignupTeacher from "../component/SignupTeacher"
import SignupStudent from "../component/SignupStudent"
const SignupPage= ()=>{
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
    <div className="flex flex-col items-center my-6">
      <p className="mb-2 text-gray-700 text-sm">
        {role === 'student' ? 'Teacher sign up?' : 'Student sign up?'}
      </p>
      <button
        onClick={handleRole}
        className="px-2 py-2 mx-0.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Click
      </button>
    </div>

    <div className="max-w-md mx-auto">
      {role === 'student' ? (
       <SignupStudent/>
      ) : (
<SignupTeacher/>
      )}
    </div>
  </>
);
}

export default SignupPage