import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { cardClass } from "../utils/theme";

const COLORS = ["#1c2541", "#c9972e", "#7d8597", "#a1683a", "#5c6b8a", "#d4a94a"];

function getSubjectData(sessions) {
    const grouped = sessions.reduce((acc, session) => {
        acc[session.subject] = (acc[session.subject] || 0) + Number(session.duration);
        return acc;
    }, {});
    return Object.entries(grouped).map(([subject, minutes]) => ({ name: subject, value: minutes }));
}

function getWeeklyData(sessions) {
    const weeks = [];
    const today = new Date();
    for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - i * 7 - today.getDay() + 1);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);

        const weekSessions = sessions.filter((s) => {
            if (!s.date) return false;
            const d = new Date(s.date);
            return d >= weekStart && d < weekEnd;
        });

        const totalMinutes = weekSessions.reduce((sum, s) => sum + Number(s.duration), 0);
        weeks.push({ week: `Week ${4 - i}`, hours: Number((totalMinutes / 60).toFixed(1)) });
    }
    return weeks;
}

function getDailyData(sessions) {
    const days = [];
    const today = new Date();

    for (let i = 13; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        day.setHours(0, 0, 0, 0);

        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);

        const daySessions = sessions.filter((s) => {
            if (!s.date) return false;
            const d = new Date(s.date);
            return d >= day && d < nextDay;
        });

        const totalMinutes = daySessions.reduce((sum, s) => sum + Number(s.duration), 0);

        days.push({
            day: day.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
            minutes: totalMinutes,
        });
    }

    return days;
}

function AnalyticsDashboard({ sessions }) {
    const { theme } = useTheme();
    const subjectData = getSubjectData(sessions);
    const weeklyData = getWeeklyData(sessions);
    const dailyData = getDailyData(sessions);
    const gridColor = theme === "dark" ? "#2f3b5e" : "#e9e2d3";

    if (sessions.length === 0) {
        return (
            <div className={`${cardClass(theme)} p-4 mt-6 text-center text-gray-400 animate-fade-in-up`}>
                📊 Add some sessions to see your analytics!
            </div>
        );
    }

    return (
        <div className={`${cardClass(theme)} p-4 mt-6 animate-fade-in-up`}>
            <h2 className="font-display text-xl font-medium mb-4">📊 Analytics Dashboard</h2>

            <h3 className="text-lg mb-2">Time by Subject</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={subjectData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}
                        label={(entry) => `${entry.name}: ${entry.value}m`}>
                        {subjectData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <h3 className="text-lg mb-2 mt-8">Daily Trend (Last 14 Days)</h3>
            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="day" stroke="#8a8a7f" fontSize={11} />
                    <YAxis stroke="#8a8a7f" label={{ value: "Minutes", angle: -90, position: "insideLeft", fill: "#8a8a7f" }} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="minutes"
                        stroke="#c9972e"
                        strokeWidth={2.5}
                        dot={{ fill: "#1c2541", r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            <h3 className="text-lg mb-2 mt-8">Weekly History (Last 4 Weeks)</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="week" stroke="#8a8a7f" />
                    <YAxis stroke="#8a8a7f" label={{ value: "Hours", angle: -90, position: "insideLeft", fill: "#8a8a7f" }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#1c2541" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AnalyticsDashboard;