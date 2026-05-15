import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import LogoName from "../assets/images/logo/title-moviebaz.png";
import Logo from "../assets/images/logo/logo.png";
import { User } from "lucide-react";
import { NavLink } from "react-router-dom";
import Home from "../pages/Home";

function Navbar({ onSearch }) {
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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


  return (


    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all py-2 duration-500 ease-in-out ${
        isScrolled
          ? "bg-stone-800/90  backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-black/50 via-black/30 to-transparent py-2 "
      } `}
    >
      <div className="max-w-8xl mx-auto md:mx-28 px-1 py-1 flex items-center justify-center gap-2">
        {/* logo */}
        <div className="flex items-center gap-2 w-1/3">
          <img src={LogoName} alt="LogoName" className="w-auto h-10 md:h-9 mt-5" />
          <img src={Logo} alt="Logo" className="w-auto h-12 md:h-10 mt-2" />
        </div>

        {/* nav */}
        <nav className="hidden lg:flex items-center justify-center w-1/3">
          <div className="flex items-center gap-2 bg-stone-800/40 backdrop-blur-sm border border-white/10 rounded-full p-2 shadow-inner">
            <NavLink to="/home" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/movies" className={linkClass}>
              Movies
            </NavLink>
            <NavLink to="/series" className={linkClass}>
              Series
            </NavLink>
            <NavLink to="/favorites" className={linkClass}>
              Favorites
            </NavLink>
          </div>
        </nav>

        <div className="flex items-center justify-end gap-4 w-1/3">
          <SearchBar onSearch={onSearch} />

          {/* آیکون یا تصویر پروفایل مینیمال */}
          <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm border border-white/5">
            <User size={20} className="text-slate-300" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
