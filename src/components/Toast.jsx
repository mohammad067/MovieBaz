import { X } from "lucide-react";
import { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 500000);
    return () => clearTimeout(timer);
  }, []);

  const colors = {
    success: "bg-green-700/70 border-green-500/80 text-green-300 transition-all duration-300",
    error: "bg-red-700/70 border-red-500/80 text-red-300 transition-all duration-300",
  };

  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 px-4 py-3 mx-8 rounded-xl border shadow-2xl backdrop-blur-sm ${colors[type]}`}>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Toast;