import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // با هر تایپ، سرچ انجام میشه
    // اگر خالی هم بشه، Home خودش تصمیم می‌گیره برگرده به حالت عادی
    onSearch(value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // با دکمه هم سرچ انجام میشه
    onSearch(query.trim());
  
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 w-full px-4  py-3 rounded-lg max-w-7xl"
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a movie..."
        className="flex-1 text-wrap min-w-0 shrink-0 px-3 py-2 md:px-4 md:py-3 text-sm md:text-base rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-violet-600"
      />

      <button
        type="submit"
        className="bg-violet-800 hover:bg-violet-600 shrink-0  px-3 py-2 md:px-1 md:py-2 
    text-sm md:text-base rounded-lg font-medium transition "
      >
       <span className="bg-white rounded-full justify-self-center items-center text-center">🔍</span> Search
      </button>
     
    </form>
  );
}

export default SearchBar;