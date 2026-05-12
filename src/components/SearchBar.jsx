import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleIconClick = () => {
    setIsInputVisible((prev) => !prev);
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
    <form
      onSubmit={handleSubmit}
      className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex w-full max-w-5xl items-center px-8 py-0 text-white "
    >
      
      {/* کانتینر سرچ */}
      <div className="ml-auto flex items-center gap-2 ">
        
        {/* اینپوت */}
        <div
          className={`overflow-hidden  transition-all duration-500 ease-in-out ${
            isInputVisible
              ? "w-[250px] md:w-[800px] opacity-100"
              : "w-0 opacity-0"
          }`}
        >
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a movie..."
            className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-violet-600"
          />
        </div>

        {/* دکمه */}
        <button
          type="button"
          onClick={handleIconClick}
          className="bg-violet-800 hover:bg-violet-600 shrink-0 flex items-center gap-2 px-3 py-2 md:px-3 md:py-2 text-sm md:text-base rounded-lg font-medium transition-all duration-300"
        >
          <span className="bg-white rounded-full flex justify-center items-center text-center w-6 h-6">
            🔍
          </span>
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;