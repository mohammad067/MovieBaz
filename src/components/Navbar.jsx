import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import LogoName from "../assets/images/logo/title-moviebaz.png";
import Logo from "../assets/images/logo/logo.png";
import { User, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import Toast from "../components/Toast";

function Navbar({ onSearch }) {
  const [isScrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("moviebaz_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!showDropdown) return;
    const close = () => setShowDropdown(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [showDropdown]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all py-2 duration-500 ease-in-out ${
          isScrolled
            ? "bg-stone-800/90 backdrop-blur-sm shadow-lg"
            : "bg-gradient-to-b from-black/50 via-black/30 to-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-28 py-1 flex items-center justify-between gap-2">
          {/* لوگو */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <img
              src={LogoName}
              alt="LogoName"
              className="w-auto h-7 sm:h-8 md:h-9 mt-3"
            />
            <img src={Logo} alt="Logo" className="w-auto h-9 sm:h-10 md:h-10" />
          </div>

          {/* منوی دسکتاپ */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
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

            </div>
          </nav>

          {/* سمت راست */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0">
            <SearchBar onSearch={onSearch} />

            {user ? (
              <div className="relative">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown((prev) => !prev);
                    }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 cursor-pointer hover:border-white/50 transition-all"
                  />
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown((prev) => !prev);
                    }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 cursor-pointer"
                  >
                    <User className="text-white" size={18} />
                  </div>
                )}

                {showDropdown && (
                  <div className="absolute right-0 top-12 bg-stone-900 border border-white/10 rounded-xl p-3 w-44 shadow-2xl z-50">
                    <p className="text-white text-sm font-medium truncate text-center">
                      {user.name}
                    </p>
                    <p className="text-slate-400 text-xs truncate mb-3">
                      {user.email}
                    </p>
                    <button
                      onClick={() => {
                        setUser(null);
                        localStorage.removeItem("moviebaz_user");
                        setShowDropdown(false);
                        setToast({
                          message: "Signed out successfully",
                          type: "error",
                        });
                      }}
                      className="w-full text-xs text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-300/50 rounded-lg py-1.5 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => setShowLogin(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm border border-white/5"
              >
                <User size={18} className="text-slate-300" />
              </div>
            )}

            {/* همبرگر */}
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

        {/* منوی موبایل */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-900/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex flex-col gap-1">
            <NavLink
              to="/home"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Movies
            </NavLink>
            <NavLink
              to="/series"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Series
            </NavLink>

          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={(userData) => {
            setUser(userData);
            localStorage.setItem("moviebaz_user", JSON.stringify(userData));
            setToast({
              message: `Wellcome, ${userData.name}! 👋 `,
              type: "success",
            });
          }}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default Navbar;
