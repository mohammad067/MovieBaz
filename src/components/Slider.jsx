import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { normalizeMovie } from "../utils/normalizeMovie";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Play } from "lucide-react";

function Slider({ movies = [] }) {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderMovies = movies.slice(0, 4);
  const normalizeMovies = sliderMovies.map(normalizeMovie);

  if (!normalizeMovies.length) return null;

  const safeIndex = activeIndex % normalizeMovies.length;
  const activeMovie = normalizeMovies[safeIndex];

  const rotatedMovies = [
    ...normalizeMovies.slice(safeIndex),
    ...normalizeMovies.slice(0, safeIndex),
  ];

  const handlePlayClick = () => {
    if (!activeMovie) return;

    navigate(
      `/${activeMovie.type}/${activeMovie.id}/${encodeURIComponent(activeMovie.slug)}`
    );
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh]">
      <Swiper
        loop={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full relative"
      >
        {normalizeMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none z-10" />

              <div className="absolute max-w-2xl inset-0 z-10 flex items-end md:items-center justify-start px-6 md:px-16 pb-10 md:pb-0 pointer-events-none">
                <div>
                  <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-5 drop-shadow-2xl line-clamp-2 md:line-clamp-3 leading-tight">
                    {movie.title}
                  </h2>

                  <div className="flex flex-col items-start gap-2">
                    <span className="bg-yellow-400 text-black font-extrabold text-sm px-3 py-1 rounded">
                      IMDB
                    </span>

                    <span className="text-white font-bold text-2xl">
                      {movie.rating}
                      <span className="text-xl font-normal">/ 10</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

{/* دکمه پلی */}
<Link
  to={`/${activeMovie.type}/${activeMovie.id}/${encodeURIComponent(activeMovie.slug)}`}
  className="absolute top-1/2 left-1/2 md:left-[45%] -translate-x-1/2 -translate-y-1/2 z-30"
>
  <div className="relative flex items-center justify-center group cursor-pointer hover:scale-110 transition-all duration-500">
    
    {/* دایره بزرگ */}
    <div className="absolute w-44 h-44 border border-white/20 rounded-full" />

    {/* دایره وسط */}
    <div className="absolute w-32 h-32 border border-white/40 rounded-full" /> 

    {/* دکمه اصلی */}
    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:scale-95 transition duration-300">
      <Play
        className="w-10 h-10 text-white ml-1"
        fill="white"
      />
    </div>

  </div>
</Link>

      <div className="absolute bottom-1/4 left-0 -right-1/2 z-20 hidden md:flex justify-center gap-1 overflow-hidden py-3">
        {rotatedMovies.map((movie, index) => (
          <Link
            key={movie.id}
            to={`/${movie.type}/${movie.id}/${encodeURIComponent(movie.slug)}`}
            onClick={(e) => {
              e.preventDefault();

              const targetIndex = normalizeMovies.findIndex(
                (item) => item.id === movie.id
              );

              swiperRef.current?.slideToLoop(targetIndex);

              setTimeout(() => {
                navigate(
                  `/${movie.type}/${movie.id}/${encodeURIComponent(movie.slug)}`
                );
              }, 300);
            }}
            className={`cursor-pointer py-4 translate-x-1/2 relative hover:scale-110 transition duration-300 mx-1 ${
              index === 0
                ? "scale-105 opacity-100 mx-1"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-lg border border-white/20"
            />
            <div className="absolute bottom-4 left-0 right-0 bg-black/70 p-2 rounded-b-lg">
              <h3 className="text-white text-sm font-bold truncate">
                {movie.title}
              </h3>
              <p className="text-white text-xs mt-1 px-2 py-1 rounded w-fit">
                📅 {movie.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Slider;