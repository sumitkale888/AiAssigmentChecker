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
      {role === "student" ? (
        <SignupStudent onToggle={handleRole} />
      ) : (
        <SignupTeacher onToggle={handleRole} />
      )}
    </div>
  );
};

export default SignupPage;
