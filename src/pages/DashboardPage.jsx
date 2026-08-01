import MotivationalQuote from "../components/MotivationalQuote";
import AIStudyTip from "../components/AIStudyTip";
import WeeklyGoal from "../components/WeeklyGoal";
import StudyStreak from "../components/StudyStreak";

function DashboardPage({ sessions, timerSessions }) {
    return (
        <div>
            <MotivationalQuote />
            <AIStudyTip sessions={sessions} />
            <WeeklyGoal sessions={timerSessions} />
            <StudyStreak sessions={timerSessions} />
        </div>
    );
}

export default DashboardPage;