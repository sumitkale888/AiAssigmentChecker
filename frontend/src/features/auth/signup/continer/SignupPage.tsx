import { useState } from "react";
import SignupTeacher from "../component/SignupTeacher";
import SignupStudent from "../component/SignupStudent";

const SignupPage = () => {
  const [role, setRole] = useState<"student" | "teacher">("student");

  const handleRole = () => {
    setRole((prev) => (prev === "student" ? "teacher" : "student"));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Show Student or Teacher Signup */}
      {role === "student" ? <SignupStudent /> : <SignupTeacher />}

      {/* Toggle Button */}
      <button
        onClick={handleRole}
        className="px-4 py-2 underline text-blue-600 rounded absolute top-6 right-6 hover:text-blue-800 transition-colors"
      >
        {role === "student" ? "Teacher Signup?" : "Student Signup?"}
      </button>
    </div>
  );
};

export default SignupPage;
