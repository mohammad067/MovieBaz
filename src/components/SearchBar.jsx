import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Search, X } from "lucide-react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef(null);

  // فکوس خودکار روی اینپوت زمانی که سرچ بار باز می‌شود
  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  const toggleSearch = () => {
    setIsInputVisible((prev) => !prev);
    // در صورت بسته شدن، متن پاک شده و نتایج ریست شوند
    if (isInputVisible) {
      setQuery("");
      onSearch("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-end relative h-10">
      <AnimatePresence>
        {isInputVisible && (
          <motion.div
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: 350, opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute right-0 flex items-center bg-white/10 backdrop-blur-md border border-white/10 rounded-full overflow-hidden h-full"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search movies..."
              className="w-full bg-transparent text-white placeholder-slate-400 px-4 py-2 text-sm outline-none"
            />
            
            {/* دکمه پاک کردن/بستن زمانی که اینپوت باز است */}
            <button
              type="button"
              onClick={toggleSearch}
              className="pr-3 pl-2 text-slate-300 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* آیکون جستجو زمانی که اینپوت بسته است */}
      {!isInputVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          type="button"
          onClick={toggleSearch}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors border border-transparent hover:border-white/10 text-slate-300"
        >
          <Search size={20} />
          
        </motion.button>
      )}
    </form>
  );
}

export default SearchBar;