import { useState } from "react";

function SessionForm({ onAddSession }) {
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (subject.trim() === "" || duration.trim() === "") return;
        onAddSession(subject, duration);
        setSubject("");
        setDuration("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 flex-wrap">
            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border border-[#e0d9c8] focus:border-[#1c2541] outline-none p-2 rounded-sm bg-white text-[#1c2541] transition"
            />
            <input
                type="number"
                placeholder="Duration (min)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border border-[#e0d9c8] focus:border-[#1c2541] outline-none p-2 rounded-sm bg-white text-[#1c2541] transition"
            />
            <button
                type="submit"
                className="bg-[#1c2541] text-[#faf6ee] px-4 py-2 rounded-sm hover:bg-[#c9972e] hover:text-[#1c2541] transition"
            >
                Add Session
            </button>
        </form>
    );
}

export default SessionForm;