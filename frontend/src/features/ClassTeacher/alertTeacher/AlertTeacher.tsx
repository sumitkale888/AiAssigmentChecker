import { useState } from "react";
import Header from "../../../shared/components/header/Header";
import PageList from "../../../shared/components/sidebar/PageList";
import addImg from "../../../assets/add-svgrepo-com.svg";

const AlertTeacher = () => {
  const [message, setMessage] = useState("");
  const [classId, setClassId] = useState(""); // which class to alert
  const teacherId = 1; // Replace with logged-in teacher's ID
  const teacherName = "Mr. Smith"; // Replace with actual logged-in teacher name

  const sendAlert = async () => {
    if (!message || !classId) {
      alert("Please enter a message and select a class.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/alerts/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          teacherId,
          classId,
          teacherName,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`✅ Alert sent successfully to ${data.sentTo} students!`);
        setMessage("");
      } else {
        alert("❌ Failed to send alert.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Error sending alert.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <PageList />
        <div className="w-full rounded-l-4xl bg-gray-100 p-10">
          <h2 className="text-xl font-semibold mb-4">Send Alert</h2>

          {/* Class Selection */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2 font-medium">
              Select Class
            </label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select a Class --</option>
              <option value="1">Class 1 - Section A</option>
              <option value="2">Class 2 - Section B</option>
              <option value="3">Class 3 - Section C</option>
        
            </select>
          </div>

          {/* Message + Button */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="Enter your alert message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 rounded-4xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-[70px] hover:bg-blue-700"
              onClick={sendAlert}
            >
              Add Alert Message
              <img src={addImg} alt="add" className="w-[15px]" />
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            Click the button to send an emergency alert email to all students in the selected class.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertTeacher;
