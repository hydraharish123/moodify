import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useProfile } from "./useProfile";
import Spinner from "../../ui/Spinner";
import { analyseUserStats } from "../../utils/analyseUserStats";
import { COLORS, moodScores } from "../../utils/constants";

function UserStats() {
  const [showLegend, setShowLegend] = useState(false);
  const { data, isLoading } = useProfile();
  if (isLoading) return <Spinner />;

  const { moodOverTime, moodData } = analyseUserStats(data);
  const moodScoreData = moodOverTime
    .map((item) => ({
      date: item.date,
      score: moodScores[item.mood],
    }))
    .slice(-15);

  return (
    <div className=" p-6 space-y-10 text-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">User Mood Statistics</h1>

        <div className="relative">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Mood Label Legend
          </button>
          {showLegend && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              <ul className="divide-y divide-gray-200 text-sm p-2">
                {Object.entries(moodScores).map(([mood, score]) => (
                  <li key={mood} className="flex justify-between px-3 py-2">
                    <span className="capitalize">{mood}</span>
                    <span className="font-semibold text-indigo-600">
                      {score}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Mood Frequency</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mood" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Mood Proportions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moodData}
                dataKey="count"
                nameKey="mood"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {moodData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Mood Score Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodScoreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserStats;
