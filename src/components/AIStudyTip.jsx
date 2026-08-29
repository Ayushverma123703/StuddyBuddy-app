import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { cardClass, primaryBtn } from "../utils/theme";

const MODELS_TO_TRY = [
    "llama-3.3-70b-versatile",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
];

function renderFormattedText(text) {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}

function AIStudyTip({ sessions }) {
    const { theme } = useTheme();
    const [tip, setTip] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateTip = async () => {
        setIsLoading(true);
        setError(null);

        const sessionSummary = sessions
            .map((s) => `${s.subject}: ${s.duration} minutes`)
            .join(", ");

        const prompt = sessions.length === 0
            ? `A student hasn't logged any study sessions yet. Give them:
1. A short encouraging message to get started
2. 3 practical tips on how to begin building a study routine
3. Suggest which subjects/topics beginners often benefit from starting with (general advice)

Keep it structured, friendly, and actionable. Use short paragraphs, not more than 150 words total.`
            : `A student has logged these study sessions: ${sessionSummary}.

Based on this data, provide:
1. A brief analysis of their current study pattern (which subjects need more attention, is time distribution balanced)
2. Specific advice on WHAT to focus on next (which subject needs more time)
3. Specific advice on HOW to study more effectively (a study technique relevant to their subjects, like active recall, spaced repetition, etc.)

Keep it structured with clear points, friendly tone, not more than 150 words total.`;

        const apiKey = import.meta.env.VITE_GROQ_API_KEY;

        for (const model of MODELS_TO_TRY) {
            try {
                const response = await fetch(
                    "https://api.groq.com/openai/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${apiKey}`,
                        },
                        body: JSON.stringify({
                            model: model,
                            messages: [{ role: "user", content: prompt }],
                        }),
                    }
                );

                if (response.status === 404) {
                    continue;
                }

                const data = await response.json();
                const aiText = data.choices[0].message.content;
                setTip(aiText);
                setIsLoading(false);
                return;
            } catch (err) {
                continue;
            }
        }

        setError("AI service is currently unavailable. Please try again later.");
        setIsLoading(false);
    };

    return (
        <div className={`${cardClass(theme)} p-4 mt-6 animate-fade-in-up`}>
            <h2 className="font-display text-xl font-medium mb-2">🤖 AI Study Plan</h2>

            {isLoading && <p className="text-gray-400">Analyzing your study pattern...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {tip && !isLoading && (
                <p className="whitespace-pre-line leading-relaxed">{renderFormattedText(tip)}</p>
            )}

            <button
                onClick={generateTip}
                className={`${primaryBtn(theme)} px-4 py-2 mt-3`}
            >
                Get Study Plan
            </button>
        </div>
    );
}

export default AIStudyTip;