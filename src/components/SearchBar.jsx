function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <input
            type="text"
            placeholder="🔍 Search by subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#e0d9c8] focus:border-[#1c2541] outline-none p-3 rounded-sm w-full mb-4 bg-white text-[#1c2541] transition"
        />
    );
}

export default SearchBar;