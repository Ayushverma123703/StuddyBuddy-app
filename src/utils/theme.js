export function cardClass(theme) {
    return theme === "dark"
        ? "bg-[#1e2847] border border-[#2f3b5e] rounded-xl shadow-lg shadow-black/30"
        : "bg-[#fffcf7] border border-[#e9e2d3] rounded-xl shadow-sm shadow-[#1c2541]/5";
}

export function pageClass(theme) {
    return theme === "dark"
        ? "min-h-screen bg-[#12182c] text-[#faf6ee] p-8"
        : "min-h-screen bg-[#faf6ee] text-[#1c2541] p-8";
}

export function primaryBtn(theme) {
    return theme === "dark"
        ? "bg-[#c9972e] text-[#1c2541] hover:bg-[#e0af45] rounded-sm font-medium transition-colors duration-200"
        : "bg-[#1c2541] text-[#faf6ee] hover:bg-[#c9972e] hover:text-[#1c2541] rounded-sm font-medium transition-colors duration-200";
}

export function inputClass() {
    return "border border-[#e0d9c8] focus:border-[#1c2541] outline-none rounded-sm bg-white text-[#1c2541] transition";
}