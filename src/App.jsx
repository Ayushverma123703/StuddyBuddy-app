import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import DashboardPage from "./pages/DashboardPage";
import TimerPage from "./pages/TimerPage";
import SessionsPage from "./pages/SessionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import useToast from "./hooks/useToast";
import { useTheme } from "./context/ThemeContext";
import { pageClass } from "./utils/theme";

function App() {
    const { theme } = useTheme();
    const { toast, showToast } = useToast();

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const [sessions, setSessions] = useState(() => {
        const savedSessions = localStorage.getItem("sessions");
        return savedSessions ? JSON.parse(savedSessions) : [];
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        localStorage.setItem("sessions", JSON.stringify(sessions));
    }, [sessions]);

    const handleAddSession = (subject, duration) => {
        const newSession = {
            id: Date.now(),
            subject: subject,
            duration: duration,
            date: new Date().toISOString(),
            source: "manual",
        };
        setSessions([...sessions, newSession]);
        showToast("Session added! ✅");
    };

    const handleTimerComplete = (subject, minutes) => {
        const newSession = {
            id: Date.now(),
            subject: subject,
            duration: minutes,
            date: new Date().toISOString(),
            source: "timer",
        };
        setSessions([...sessions, newSession]);
        showToast("Focus session logged! 🎯");
    };

    const handleDeleteSession = (id) => {
        setSessions(sessions.filter((session) => session.id !== id));
        showToast("Session deleted! 🗑️", "error");
    };

    const handleEditSession = (id, newSubject, newDuration) => {
        setSessions(
            sessions.map((session) =>
                session.id === id
                    ? { ...session, subject: newSubject, duration: newDuration }
                    : session
            )
        );
        showToast("Session updated! ✏️");
    };

    const timerSessions = sessions.filter((s) => s.source === "timer");

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#faf6ee] flex items-center justify-center text-[#1c2541]">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Login />;
    }

    return (
        <BrowserRouter>
            <div className={pageClass(theme)}>
                <Navbar />

                <Routes>
                    <Route
                        path="/"
                        element={<DashboardPage sessions={sessions} timerSessions={timerSessions} />}
                    />
                    <Route
                        path="/timer"
                        element={<TimerPage onSessionComplete={handleTimerComplete} showToast={showToast} />}
                    />
                    <Route
                        path="/sessions"
                        element={
                            <SessionsPage
                                sessions={sessions}
                                onAddSession={handleAddSession}
                                onDeleteSession={handleDeleteSession}
                                onEditSession={handleEditSession}
                            />
                        }
                    />
                    <Route
                        path="/analytics"
                        element={<AnalyticsPage sessions={sessions} showToast={showToast} />}
                    />
                </Routes>

                <Toast toast={toast} />
            </div>
        </BrowserRouter>
    );
}

export default App;