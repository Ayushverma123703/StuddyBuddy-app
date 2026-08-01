import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { cardClass } from "../utils/theme";

function formatDuration(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs === 0) return `${mins} min`;
    if (mins === 0) return `${hrs} hr`;
    return `${hrs} hr ${mins} min`;
}

function formatDate(dateString) {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function SessionList({ sessions, onDeleteSession, onEditSession }) {
    const { theme } = useTheme();
    const [editingId, setEditingId] = useState(null);
    const [editSubject, setEditSubject] = useState("");
    const [editDuration, setEditDuration] = useState("");

    const startEditing = (session) => {
        setEditingId(session.id);
        setEditSubject(session.subject);
        setEditDuration(session.duration);
    };

    const saveEdit = (id) => {
        onEditSession(id, editSubject, editDuration);
        setEditingId(null);
    };

    const cancelEdit = () => setEditingId(null);

    if (sessions.length === 0) {
        return (
            <div className={`${cardClass(theme)} text-center text-gray-400 mt-6 p-8 animate-fade-in-up`}>
                📚 No sessions yet. Add your first study session above!
            </div>
        );
    }

    return (
        <div className="mt-6 space-y-2">
            {sessions.map((session) => (
                <div
                    key={session.id}
                    className={`${cardClass(theme)} p-3 flex justify-between items-center hover:shadow-md transition animate-fade-in-up`}
                >
                    {editingId === session.id ? (
                        <>
                            <input
                                type="text"
                                value={editSubject}
                                onChange={(e) => setEditSubject(e.target.value)}
                                className="border border-[#e0d9c8] focus:border-[#1c2541] outline-none p-1 rounded-sm bg-white text-[#1c2541]"
                            />
                            <input
                                type="number"
                                value={editDuration}
                                onChange={(e) => setEditDuration(e.target.value)}
                                className="border border-[#e0d9c8] focus:border-[#1c2541] outline-none p-1 rounded-sm bg-white text-[#1c2541] w-20"
                            />
                            <div className="flex gap-2">
                                <button onClick={() => saveEdit(session.id)} className="bg-[#1c2541] text-[#faf6ee] px-3 py-1 rounded-sm hover:bg-[#c9972e] hover:text-[#1c2541] transition">
                                    Save
                                </button>
                                <button onClick={cancelEdit} className="bg-transparent border border-[#8a8a7f] text-[#8a8a7f] px-3 py-1 rounded-sm hover:bg-[#8a8a7f] hover:text-white transition">
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="font-medium">{session.subject}</p>
                                <p className="text-xs text-gray-400">{formatDate(session.date)}</p>
                            </div>
                            <span>{formatDuration(Number(session.duration))}</span>
                            <div className="flex gap-2">
                                <button onClick={() => startEditing(session)} className="bg-[#1c2541] text-[#faf6ee] px-3 py-1 rounded-sm hover:bg-[#c9972e] hover:text-[#1c2541] transition">
                                    Edit
                                </button>
                                <button onClick={() => onDeleteSession(session.id)} className="bg-transparent border border-[#a8382e] text-[#a8382e] px-3 py-1 rounded-sm hover:bg-[#a8382e] hover:text-white transition">
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default SessionList;