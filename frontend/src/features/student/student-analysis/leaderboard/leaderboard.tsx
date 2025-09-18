const leaderboardData = [
  {
    rank: 1,
    name: "Pruthviraj",
    avatar: "/diverse-student-profiles.png",
    badges: ["🏆 Top Performer", "🎯 Consistent Effort"],
  },
  {
    rank: 2,
    name: "Parth",
    avatar: "/diverse-student-profiles.png",
    badges: ["📚 Academic Excellence"],
  },
  {
    rank: 3,
    name: "Prashik",
    avatar: "/diverse-student-profiles.png",
    badges: ["⭐ Rising Star"],
  },
  {
    rank: 4,
    name: "Pranav",
    avatar: "/diverse-student-profiles.png",
    badges: ["🎓 Diligent Learner"],
  },
  {
    rank: 5,
    name: "Shaivi",
    avatar: "/diverse-student-profiles.png",
    badges: [],
  },
]

export function Leaderboard() {
  return (
    <div className="bg-white rounded-3xl shadow-xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">🏆 Leaderboard</h3>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {leaderboardData.map((student) => (
            <div key={student.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
              <div className="text-sm font-medium text-gray-600 w-6">{student.rank}.</div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {student.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
