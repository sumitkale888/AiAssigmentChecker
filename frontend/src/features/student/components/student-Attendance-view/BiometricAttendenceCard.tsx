"use client"

import { useState } from "react"

type ScanStatus = "idle" | "scanning" | "success" | "error"

const BiometricAttendancePage = () => {
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle")
  const [scanProgress, setScanProgress] = useState(0)
  const [attendanceData] = useState({
    studentName: "John Doe",
    studentId: "STU-2024-001",
    course: "Advanced Web Development",
    session: "Morning Session - 09:00 AM",
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  })

  const startBiometricScan = () => {
    setScanStatus("scanning")
    setScanProgress(0)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          const isSuccess = Math.random() > 0.2
          setScanStatus(isSuccess ? "success" : "error")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const resetScan = () => {
    setScanStatus("idle")
    setScanProgress(0)
  }

  if (scanStatus === "scanning") {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Scanning... {scanProgress}%</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Biometric Attendance System</h2>

      {/* Student Information */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Session Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Student Name</p>
            <p className="font-medium text-gray-800">{attendanceData.studentName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Student ID</p>
            <p className="font-medium text-gray-800">{attendanceData.studentId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-medium text-gray-800">{attendanceData.course}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Session</p>
            <p className="font-medium text-gray-800">{attendanceData.session}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Date: {attendanceData.date}</p>
        </div>
      </div>

      {/* Biometric Scanner */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 text-center">
        <h3 className="text-lg font-medium mb-6 text-gray-700">Biometric Verification</h3>

        {/* Scanner Interface */}
        <div className="flex justify-center mb-6">
          <div
            className={`
            w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-300
            ${scanStatus === "idle" ? "border-gray-300 bg-gray-50" : ""}
            ${scanStatus === "success" ? "border-green-500 bg-green-50" : ""}
            ${scanStatus === "error" ? "border-red-500 bg-red-50" : ""}
          `}
          >
            {scanStatus === "idle" && (
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-2.04-1.34-3.28 0-1.24.47-2.41 1.34-3.28.87-.87 2.04-1.34 3.28-1.34 1.24 0 2.41.47 3.28 1.34.87.87 1.34 2.04 1.34 3.28 0 1.24-.47 2.41-1.34 3.28-.09.1-.22.15-.35.15s-.26-.05-.35-.15c-.87-.87-1.34-2.04-1.34-3.28 0-1.24.47-2.41 1.34-3.28.87-.87 2.04-1.34 3.28-1.34 1.24 0 2.41.47 3.28 1.34.87.87 1.34 2.04 1.34 3.28 0 1.24-.47 2.41-1.34 3.28-.09.1-.22.15-.35.15z" />
              </svg>
            )}
            {scanStatus === "success" && (
              <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
            {scanStatus === "error" && (
              <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {scanStatus === "idle" && (
          <p className="text-gray-600 mb-6">Place your finger on the scanner to record attendance</p>
        )}
        {scanStatus === "success" && (
          <div className="mb-6">
            <p className="text-green-700 font-medium mb-2">Verification Successful!</p>
            <p className="text-sm text-green-600">Your attendance has been recorded</p>
          </div>
        )}
        {scanStatus === "error" && (
          <div className="mb-6">
            <p className="text-red-700 font-medium mb-2">Verification Failed</p>
            <p className="text-sm text-red-600">Please try again</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {scanStatus === "idle" && (
            <button
              onClick={startBiometricScan}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Scan
            </button>
          )}
          {(scanStatus === "success" || scanStatus === "error") && (
            <button
              onClick={resetScan}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Scan Again
            </button>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
        <h3 className="font-medium mb-3 text-gray-700">Instructions</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Ensure your finger is clean and dry</li>
          <li>• Place your finger firmly on the scanner</li>
          <li>• Hold still during the scanning process</li>
          <li>• Contact support if you continue to experience issues</li>
        </ul>
      </div>
    </div>
  )
}

export default BiometricAttendancePage
