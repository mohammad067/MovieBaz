import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  const toggleSearch = () => {
    setIsInputVisible((prev) => !prev);
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
    <form onSubmit={handleSubmit} className="flex items-center justify-end relative h-9 sm:h-10">
      <AnimatePresence>
        {isInputVisible && (
          <motion.div
            initial={{ width: 36, opacity: 0 }}
            animate={{ width: "min(280px, 55vw)", opacity: 1 }}
            exit={{ width: 36, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute right-0 flex items-center bg-white/10 backdrop-blur-md border border-white/10 rounded-full overflow-hidden h-full"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search..."
              className="w-full bg-transparent text-white placeholder-slate-400 px-4 py-2 text-sm outline-none"
            />
            <button
              type="button"
              onClick={toggleSearch}
              className="pr-3 pl-2 text-slate-300 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isInputVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          type="button"
          onClick={toggleSearch}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors border border-transparent hover:border-white/10 text-slate-300"
        >
          <Search size={18} />
        </motion.button>
      )}
    </form>
  );
}

export default SearchBar;