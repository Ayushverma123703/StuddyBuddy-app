import { useState, useEffect } from "react";
import { useTheme } from "../ContextTemp/ThemeContext";
import { cardClass, primaryBtn } from "../utils/theme";

function MotivationalQuote() {
    const { theme } = useTheme();
    const [quote, setQuote] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuote = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("https://dummyjson.com/quotes/random");
            const data = await response.json();
            setQuote(data.quote);
        } catch (err) {
            setError("Couldn't load quote. Try again!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className={`${cardClass(theme)} p-4 mt-6 text-center animate-fade-in-up`}>
            {isLoading && <p className="text-gray-400">Loading quote...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!isLoading && !error && (
                <p className="font-display italic text-lg">"{quote}"</p>
            )}

            <button
                onClick={fetchQuote}
                className={`${primaryBtn(theme)} px-4 py-2 mt-3`}
            >
                New Quote
            </button>
        </div>
    );
}

export default MotivationalQuote;