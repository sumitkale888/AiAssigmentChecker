import LoginForm from '../../../../shared/components/login/LoginForm'
import { useState } from 'react'


const SigninPage = () => {
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
    

    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {role === 'student' ? (
        <LoginForm
          role={'Student'}
          url={`${import.meta.env.VITE_BACKEND_URL}/auth/loginStudent`}
        />
      ) : (
        <LoginForm
          role={'Teacher'}
          url={`${import.meta.env.VITE_BACKEND_URL}/auth/loginTeacher`}
        />
      )}   
      
      <button
        onClick={handleRole}
        className="px-2 py-2  bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {role === 'student' ? 'Teacher Login?' : 'Student Login?'}
      </button>
    </div>
  </>
);

}

export default SigninPage