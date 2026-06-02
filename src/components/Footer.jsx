import { NavLink } from "react-router-dom";
import LogoName from "../assets/images/logo/title-moviebaz.png";
import Logo from "../assets/images/logo/logo.png";
import { FaTelegram, FaWhatsapp, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className=" bg-stone-900 border-t border-stone-700/50 py-8 px-4 md:px-28">
      <div className="max-w-8xl  mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-1.5">
          <img
            src={LogoName}
            alt="MovieBaz"
            className="h-7 mt-3 w-auto "
            loading="lazy"
            decoding="async"
          />
          <img
            src={Logo}
            alt="Logo"
            className="h-9 w-auto"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex items-center gap-6 text-sm text-stone-400">
          <NavLink
            to="/home"
            className="hover:text-stone-100 transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className="hover:text-stone-100 transition-colors"
          >
            Movies
          </NavLink>
          <NavLink
            to="/series"
            className="hover:text-stone-100 transition-colors"
          >
            Series
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://t.me/mohammad_083"
            className="w-9 h-9 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-blue-400 hover:border-blue-400/50 transition-all"
            target=""
          >
            <FaTelegram size={16} />
          </a>
          <a
            href="https://wa.me/+989199724318"
            className="w-9 h-9 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-green-400 hover:border-green-400/50 transition-all"
          >
            <FaWhatsapp size={16} />
          </a>
          <a
            href="https://instagram.com/mohammadr.021"
            className="w-9 h-9 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-pink-400 hover:border-pink-400/50 transition-all"
          >
            <FaInstagram size={16} />
          </a>
        </div>
      </div>

      <div className="max-w-8xl mx-auto mt-6 pt-6 border-t border-stone-800 text-center">
        <p className="text-stone-600 text-xs">
          {new Date().getFullYear()} MovieBaz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
