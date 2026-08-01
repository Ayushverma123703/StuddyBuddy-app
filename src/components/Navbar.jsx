import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useTheme } from "../ContextTemp/ThemeContext";

function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const linkClass = (path) =>
        location.pathname === path
            ? theme === "dark"
                ? "px-4 py-2 rounded-sm bg-[#c9972e] text-[#1c2541] font-medium transition"
                : "px-4 py-2 rounded-sm bg-[#1c2541] text-[#faf6ee] font-medium transition"
            : theme === "dark"
                ? "px-4 py-2 rounded-sm text-[#a8a89e] hover:text-[#faf6ee] transition"
                : "px-4 py-2 rounded-sm text-[#8a8a7f] hover:text-[#1c2541] transition";

    const navItems = [
        { path: "/", label: "Dashboard" },
        { path: "/timer", label: "Timer" },
        { path: "/sessions", label: "Sessions" },
        { path: "/analytics", label: "Analytics" },
    ];

    return (
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1c2541] rounded-sm flex items-center justify-center rotate-3">
                    <div className="w-2.5 h-2.5 bg-[#c9972e] rounded-full"></div>
                </div>
                <h1 className="font-display text-2xl font-medium">StudyBuddy</h1>
            </div>

            <div className="flex gap-1 flex-wrap">
                {navItems.map((item) => (
                    <Link key={item.path} to={item.path} className={linkClass(item.path)}>
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={toggleTheme}
                    className={
                        theme === "dark"
                            ? "bg-[#faf6ee] text-[#1c2541] px-4 py-2 rounded-sm font-medium hover:bg-[#c9972e] transition"
                            : "bg-[#1c2541] text-[#faf6ee] px-4 py-2 rounded-sm font-medium hover:bg-[#c9972e] hover:text-[#1c2541] transition"
                    }
                >
                    {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>
                <button
                    onClick={() => signOut(auth)}
                    className="bg-transparent border border-[#a8382e] text-[#a8382e] px-4 py-2 rounded-sm hover:bg-[#a8382e] hover:text-white transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;