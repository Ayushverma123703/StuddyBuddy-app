import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SessionForm from "../components/SessionForm";
import SessionList from "../components/SessionList";

function SessionsPage({ sessions, onAddSession, onDeleteSession, onEditSession }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSessions = sessions.filter((session) =>
        session.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SessionForm onAddSession={onAddSession} />
            <SessionList
                sessions={filteredSessions}
                onDeleteSession={onDeleteSession}
                onEditSession={onEditSession}
            />
        </div>
    );
}

export default SessionsPage;