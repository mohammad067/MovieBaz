
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
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
    <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[75vh] overflow-hidden">
      <Swiper
        loop={true}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
        style={{ zIndex: 0 }}  // ✅ Swiper خودش z-index پایین داره
      >
        {normalizeMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* افکت‌ها */}
              <div className="absolute inset-0 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none z-10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ محتوای متنی و دکمه کاملاً خارج از Swiper و بالاترین z-index */}
      <div className="absolute max-w-lg inset-0 z-30 flex items-end md:items-center justify-start px-6 md:px-16 pb-24 md:pb-0 ">
        <div className="space-y-4">
                  <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-5 drop-shadow-2xl ">
            {activeMovie?.title}
          </h2>

          <div className="flex flex-col items-start gap-2">
            <span className="bg-yellow-400 text-black font-extrabold text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">
              IMDB
            </span>

            <span className="text-white font-bold text-xl md:text-2xl">
              {activeMovie?.rating}
              <span className="text-lg md:text-xl font-normal">/ 10</span>
            </span>

            {/* ✅ دکمه pointer-events-auto و بالاترین z */}
            <div className="mt-2 pointer-events-auto relative z-50 ">
              <button
                type="button"
                onClick={handlePlayClick}
                className="flex items-center justify-center gap-2 md:gap-4 bg-white text-black font-bold rounded-lg p-2 md:px-4 md:py-2 max-w-[150px] hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_15px_rgba(250,255,255,0.5)] cursor-pointer"
              >
                <span className="text-sm  md:text-lg"> Watch </span>
                <div className="w-5 h-5 md:w-9 md:h-9  rounded-full bg-black flex items-center justify-center">
                  <Play className="w-3 h-3 md:w-4 md:h-4 text-white fill-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ کارت‌ها z-20 دارن ولی چون دکمه z-50 هست مشکلی نیست */}
      <div className="absolute bottom-1/4 left-0 -right-1/2 z-10 hidden md:flex justify-center gap-1 overflow-hidden py-3">
        {rotatedMovies.map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => {
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
              index === 0 ? "scale-105 opacity-100" : "opacity-50 hover:opacity-80"
            }`}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-xl border border-white/20"
            />
            <div className="absolute bottom-4 left-0 right-0 bg-black/70 p-2 rounded-b-xl">
              <h3 className="text-white text-sm font-bold truncate">{movie.title}</h3>
              <p className="text-white text-xs mt-1 px-2 py-1 rounded w-fit">
                📅 {movie.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;


