import SearchBar from "./SearchBar";

function Navbar({ onSearch }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-sm bg-slate-900/50 border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center gap-2">

        {/* logo */}
        <h1 className="shrink-0 text-base sm:text-xl md:text-2xl font-bold text-violet-500 cursor-pointer">
          MovieBaz
        </h1>

        {/* search */}
        <div className="flex-1 flex justify-start ml-16">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* nav */}
        <nav className="flex items-center gap-3 sm:gap-6 justify-start">
          
          <a className="text-sm sm:text-base text-slate-300 hover:text-violet-400 cursor-pointer">
            Home
          </a>

          <a className="text-sm sm:text-base text-slate-300 hover:text-violet-400 cursor-pointer">
            Favorites
          </a>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;