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
    <div className="flex flex-col items-center my-6">
      <p className="mb-2 text-gray-700 text-sm">
        {role === 'student' ? 'Teacher sign in?' : 'Student sign in?'}
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
        <LoginForm
          role={'Student'}
          url={'http://localhost:3000/api/auth/loginStudent'}
        />
      ) : (
        <LoginForm
          role={'Teacher'}
          url={'http://localhost:3000/api/auth/loginTeacher'}
        />
      )}
    </div>
    
  </>
);

}

export default SigninPage