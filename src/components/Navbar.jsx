import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import LogoName from "../assets/images/logo/title-moviebaz.png";
import Logo from "../assets/images/logo/logo.png";
import { User, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar({ onSearch }) {
  const [isScrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `rounded-full transition-all duration-300 whitespace-nowrap px-4 py-2 text-sm font-medium
     ${
       isActive
         ? "bg-white text-stone-950 shadow-[0_0_15px_rgba(250,255,255,0.5)]"
         : "text-[#6D676E] hover:text-[#FBFFFE] hover:bg-white/5"
     }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-xl transition-all duration-300 px-5 py-3 text-sm font-medium
     ${
       isActive
         ? "bg-white text-stone-950"
         : "text-slate-300 hover:text-white hover:bg-white/10"
     }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all py-2 duration-500 ease-in-out ${
        isScrolled
          ? "bg-stone-800/90 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-black/50 via-black/30 to-transparent"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-28 py-1 flex items-center justify-between gap-2">
        
        {/* لوگو - بدون mt اضافه */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <img src={LogoName} alt="LogoName" className="w-auto h-7 sm:h-8 md:h-9" />
          <img src={Logo} alt="Logo" className="w-auto h-9 sm:h-10 md:h-10" />
        </div>

        {/* منوی دسکتاپ */}
        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-2 bg-stone-800/40 backdrop-blur-sm border border-white/10 rounded-full p-2 shadow-inner">
            <NavLink to="/home" className={linkClass}>Home</NavLink>
            <NavLink to="/movies" className={linkClass}>Movies</NavLink>
            <NavLink to="/series" className={linkClass}>Series</NavLink>
            <NavLink to="/favorites" className={linkClass}>Favorites</NavLink>
          </div>
        </nav>

        {/* سمت راست: سرچ + پروفایل + همبرگر */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0">
          <SearchBar onSearch={onSearch} />

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm border border-white/5">
            <User size={18} className="text-slate-300" />
          </div>

          {/* دکمه همبرگر - فقط موبایل و تبلت */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/5"
          >
            {mobileMenuOpen ? (
              <X size={18} className="text-slate-300" />
            ) : (
              <Menu size={18} className="text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* منوی موبایل/تبلت */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          <NavLink to="/home" className={mobileLinkClass} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/movies" className={mobileLinkClass} onClick={() => setMobileMenuOpen(false)}>Movies</NavLink>
          <NavLink to="/series" className={mobileLinkClass} onClick={() => setMobileMenuOpen(false)}>Series</NavLink>
          <NavLink to="/favorites" className={mobileLinkClass} onClick={() => setMobileMenuOpen(false)}>Favorites</NavLink>
        </div>
      )}
    </header>
  );
}

export default Navbar;