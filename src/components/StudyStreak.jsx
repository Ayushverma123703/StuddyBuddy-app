import { useTheme } from "../ContextTemp/ThemeContext";
import { cardClass } from "../utils/theme";

function getDateOnly(dateString) {
    return new Date(dateString).toDateString();
}

function calculateStreak(sessions) {
    const studyDays = new Set(
        sessions.filter((s) => s.date).map((s) => getDateOnly(s.date))
    );

    let streak = 0;
    let currentDate = new Date();

    while (studyDays.has(currentDate.toDateString())) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
}

function StudyStreak({ sessions }) {
    const { theme } = useTheme();
    const streak = calculateStreak(sessions);

    return (
        <div className={`${cardClass(theme)} p-4 mt-6 text-center animate-fade-in-up`}>
            <h2 className="font-display text-xl font-medium mb-2">🔥 Study Streak</h2>
            {streak > 0 ? (
                <p className="text-3xl font-medium text-[#c9972e]">
                    {streak} {streak === 1 ? "day" : "days"}
                </p>
            ) : (
                <p className="text-gray-400">No active streak. Study today to start one!</p>
            )}
        </div>
    );
}

export default StudyStreak;