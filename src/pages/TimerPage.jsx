import PomodoroTimer from "../components/PomodoroTimer";

function TimerPage({ onSessionComplete, showToast }) {
    return (
        <div>
            <PomodoroTimer onSessionComplete={onSessionComplete} showToast={showToast} />
        </div>
    );
}

export default TimerPage;