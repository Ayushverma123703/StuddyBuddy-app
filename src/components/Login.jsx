import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const taglines = ["Track your sessions.", "Build your streak.", "Stay focused."];

function Login() {
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = taglines[textIndex];
        const speed = deleting ? 30 : 60;

        const timeout = setTimeout(() => {
            if (!deleting && charIndex < current.length) {
                setDisplayText(current.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else if (!deleting && charIndex === current.length) {
                setTimeout(() => setDeleting(true), 1200);
            } else if (deleting && charIndex > 0) {
                setDisplayText(current.slice(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            } else if (deleting && charIndex === 0) {
                setDeleting(false);
                setTextIndex((textIndex + 1) % taglines.length);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, textIndex]);

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#faf6ee]">
            {/* Left panel — content */}
            <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-16 relative">
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: "radial-gradient(#1c2541 0.6px, transparent 0.6px)",
                        backgroundSize: "22px 22px",
                    }}
                ></div>

                <div className="relative z-10 max-w-md">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-[#1c2541] rounded-sm flex items-center justify-center rotate-3">
                            <div className="w-3 h-3 bg-[#c9972e] rounded-full"></div>
                        </div>
                        <p className="font-display text-2xl font-medium text-[#1c2541] tracking-tight">
                            StudyBuddy
                        </p>
                    </div>

                    <h1 className="font-display text-5xl md:text-6xl font-medium text-[#1c2541] leading-[1.1] mb-6">
                        A quiet space<br />to get things done.
                    </h1>
                    <p className="text-[#5a5a52] text-lg h-8">
                        {displayText}
                        <span className="animate-blink border-r-2 border-[#1c2541] ml-0.5"></span>
                    </p>

                    <div className="mt-10 flex gap-8 text-sm text-[#8a8a7f]">
                        <div>
                            <p className="font-display text-2xl text-[#1c2541]">01</p>
                            <p>Focus sessions</p>
                        </div>
                        <div>
                            <p className="font-display text-2xl text-[#1c2541]">02</p>
                            <p>Weekly insights</p>
                        </div>
                        <div>
                            <p className="font-display text-2xl text-[#1c2541]">03</p>
                            <p>Daily streaks</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel — sign in */}
            <div className="flex-1 bg-[#1c2541] flex items-center justify-center px-10 py-16 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: "linear-gradient(#faf6ee 1px, transparent 1px), linear-gradient(90deg, #faf6ee 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                ></div>

                <div className="relative z-10 text-center max-w-xs">
                    <div className="w-12 h-12 border border-[#c9972e]/40 rounded-full flex items-center justify-center mx-auto mb-8">
                        <div className="w-2 h-2 bg-[#c9972e] rounded-full"></div>
                    </div>

                    <h2 className="font-display text-2xl text-[#faf6ee] mb-2">Welcome back</h2>
                    <p className="text-[#a8a89e] text-sm mb-8">Sign in to continue where you left off.</p>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-[#faf6ee] text-[#1c2541] px-6 py-3 rounded-sm font-medium flex items-center justify-center gap-3 hover:bg-[#c9972e] hover:text-[#1c2541] transition-colors duration-200"
                    >
                        <svg width="18" height="18" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        Sign in with Google
                    </button>

                    <p className="text-[#6b6b62] text-xs mt-8">No spam. No noise. Just focus.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;