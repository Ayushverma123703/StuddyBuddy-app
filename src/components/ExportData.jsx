import { useTheme } from "../context/ThemeContext";
import { cardClass } from "../utils/theme";

function exportAsJSON(sessions) {
    const dataStr = JSON.stringify(sessions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "study_sessions.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function exportAsCSV(sessions) {
    const headers = "Subject,Duration (min),Date,Source\n";
    const rows = sessions
        .map((s) => `${s.subject},${s.duration},${s.date || "N/A"},${s.source || "manual"}`)
        .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "study_sessions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function ExportData({ sessions, showToast }) {
    const { theme } = useTheme();

    const handleExport = (type) => {
        if (sessions.length === 0) {
            showToast("No sessions to export!", "error");
            return;
        }
        type === "json" ? exportAsJSON(sessions) : exportAsCSV(sessions);
        showToast(`Exported as ${type.toUpperCase()}! 📥`);
    };

    return (
        <div className={`${cardClass(theme)} p-4 mt-6 animate-fade-in-up`}>
            <h2 className="font-display text-xl font-medium mb-3">📥 Export Data</h2>
            <div className="flex gap-2">
                <button onClick={() => handleExport("csv")} className="bg-[#1c2541] text-[#faf6ee] px-4 py-2 rounded-sm hover:bg-[#c9972e] hover:text-[#1c2541] transition">
                    Export as CSV
                </button>
                <button onClick={() => handleExport("json")} className="bg-transparent border border-[#1c2541] text-[#1c2541] px-4 py-2 rounded-sm hover:bg-[#1c2541] hover:text-[#faf6ee] transition">
                    Export as JSON
                </button>
            </div>
        </div>
    );
}

export default ExportData;