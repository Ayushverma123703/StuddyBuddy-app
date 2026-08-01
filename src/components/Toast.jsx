function Toast({ toast }) {
    if (!toast) return null;

    const bgColor = toast.type === "success" ? "bg-green-500" : "bg-red-500";

    return (
        <div className={`fixed bottom-6 right-6 ${bgColor} text-white px-5 py-3 rounded shadow-lg z-50`}>
            {toast.message}
        </div>
    );
}

export default Toast;