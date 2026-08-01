import { useState, useEffect } from "react";
import { useTheme } from "../ContextTemp/ThemeContext";
import { cardClass } from "../utils/theme";

function playBeep() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    function beep(startTime) {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.3;
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5);
    }
    beep(context.currentTime);
    beep(context.currentTime + 0.6);
    beep(context.currentTime + 1.2);
}

function PomodoroTimer({ onSessionComplete, showToast }) {
    const { theme } = useTheme();
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [showComplete, setShowComplete] = useState(false);
    const [subject, setSubject] = useState("");

    useEffect(() => {
        if (!isRunning) return;

        if (timeLeft === 0) {
            setIsRunning(false);
            playBeep();
            setShowComplete(true);
            onSessionComplete(subject, 25);
            setTimeout(() => setShowComplete(false), 3000);
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const handleStart = () => {
        if (subject.trim() === "") {
            showToast("Please enter a subject first!", "error");
            return;
        }
        setIsRunning(true);
    };

    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
        setShowComplete(false);
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return (
        <div className={`${cardClass(theme)} p-6 mt-6 text-center animate-fade-in-up`}>
            <h2 className="font-display text-xl font-medium mb-2">Pomodoro Timer</h2>

            {showComplete && (
                <p className="text-green-400 font-bold mb-2">Session Complete! 🎉 Logged automatically.</p>
            )}

            <input
                type="text"
                placeholder="What are you studying?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isRunning}
                className="border border-[#e0d9c8] focus:border-[#1c2541] outline-none p-2 rounded-sm bg-white text-[#1c2541] mb-3 w-64 transition"
            />

            <p className="font-display text-5xl mb-4">{formattedTime}</p>
            <div className="flex gap-2 justify-center">
                <button onClick={handleStart} className="bg-[#1c2541] text-[#faf6ee] px-4 py-2 rounded-sm hover:bg-[#c9972e] hover:text-[#1c2541] transition">
                    Start
                </button>
                <button onClick={handlePause} className="bg-transparent border border-[#8a8a7f] text-[#8a8a7f] px-4 py-2 rounded-sm hover:bg-[#8a8a7f] hover:text-white transition">
                    Pause
                </button>
                <button onClick={handleReset} className="bg-transparent border border-[#a8382e] text-[#a8382e] px-4 py-2 rounded-sm hover:bg-[#a8382e] hover:text-white transition">
                    Reset
                </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
                ⏱️ Only fully completed 25-min sessions count toward your goal & streak.
            </p>
        </div>
    );
}

export default PomodoroTimer;