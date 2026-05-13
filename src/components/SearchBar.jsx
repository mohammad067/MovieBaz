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
      className="flex items-center justify-center ml-auto text-white "
    >
      <div className="flex items-center gap-2">
        {/* input */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isInputVisible
              ? "w-[180px] sm:w-[260px] md:w-[850px] opacity-100"
              : "w-0 opacity-0"
          }`}
        >
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a movie..."
            className="w-full px-3 py-2 text-sm md:text-base rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-violet-600"
          />
        </div>
        {/* button */}
        <button
          type="button"
          onClick={handleIconClick}
          className="bg-violet-800 hover:bg-violet-600 shrink-0 flex items-center gap-2 px-3 py-2 text-sm md:text-base rounded-lg font-medium transition-all duration-300"
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
