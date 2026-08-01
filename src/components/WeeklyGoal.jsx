import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { cardClass, inputClass } from "../utils/theme";

function getStartOfWeek() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
}

function WeeklyGoal({ sessions }) {
    const { theme } = useTheme();
    const [goalHours, setGoalHours] = useState(10);

    const startOfWeek = getStartOfWeek();

    const thisWeekSessions = sessions.filter(
        (session) => session.date && new Date(session.date) >= startOfWeek
    );

    const totalMinutes = thisWeekSessions.reduce(
        (sum, session) => sum + Number(session.duration),
        0
    );

    const totalHours = totalMinutes / 60;
    const goalMinutes = goalHours * 60;
    const percentage = Math.min((totalMinutes / goalMinutes) * 100, 100);

    return (
        <div className={`${cardClass(theme)} p-4 mt-6 animate-fade-in-up`}>
            <h2 className="font-display text-xl font-medium mb-2">🎯 Weekly Goal</h2>

            <div className="flex items-center gap-2 mb-3">
                <label>Target hours this week:</label>
                <input
                    type="number"
                    value={goalHours}
                    onChange={(e) => setGoalHours(Number(e.target.value))}
                    className={`${inputClass()} p-1 w-16`}
                />
            </div>

            <p className="mb-2">
                {totalHours.toFixed(1)} hrs / {goalHours} hrs ({percentage.toFixed(0)}%)
            </p>

            <div className={theme === "dark" ? "w-full bg-[#2f3b5e] rounded-full h-3" : "w-full bg-[#e9e2d3] rounded-full h-3"}>
                <div
                    className="bg-[#c9972e] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}

export default WeeklyGoal;