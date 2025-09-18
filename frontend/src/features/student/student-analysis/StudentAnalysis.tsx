import { useState, useEffect } from "react"
import { AssignmentsTable } from "./assignments-table/assignments-table"
import { AttendanceTracker } from "./attendance/attendance-tracker"
import { OverallPerformance } from "./overall-performance/Performance"
import { Leaderboard } from "./leaderboard/leaderboard"
import Header from "../../../shared/components/header/Header"
import PageList from "../../../shared/components/sidebar/PageList"

interface ProfileData {
  fullName: string;
  rollNumber: string;
  email: string;
  phone: string;
  dob: string;
  department: string;
  address: string;
  profilePhoto: string;
}

export default function StudentAnalysis() {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "John Doe",
    rollNumber: "CS2024001",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    dob: "2000-01-15",
    department: "Computer Science",
    address: "123 University Street, Campus City, State 12345",
    profilePhoto: "https://randomuser.me/api/portraits/men/46.jpg",
  });

  // Load profile data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("studentProfile");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
  }, []);


  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
    <Header />
    <div className="flex">
    <PageList />
    <div className="w-full rounded-l-4xl bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl text-gray-900 mb-2">Student Analysis</h1>
          <p className="text-gray-600">Track your academic progress and performance insights</p>
        </div>

        {/* Student Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-blue-100">
                {profileData.profilePhoto && profileData.profilePhoto !== "https://randomuser.me/api/portraits/men/46.jpg" ? (
                  <img 
                    src={profileData.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-600">
                    {getInitials(profileData.fullName)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{profileData.fullName}</h2>
                <p className="text-gray-600">Student ID: {profileData.rollNumber}</p>
                <p className="text-gray-600">{profileData.department}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Assignments */}
          <div className="xl:col-span-2 space-y-6">
            <AssignmentsTable />
            <OverallPerformance />
          </div>

          {/* Right Column - Attendance & Leaderboard */}
          <div className="space-y-6">
            <AttendanceTracker />
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
