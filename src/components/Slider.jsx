import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { normalizeMovie } from "../utils/normalizeMovie";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Play, Film, Tv, Calendar } from "lucide-react";

function Slider({ movies = [] }) {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderMovies = movies.slice(1, 5);
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
      `/${activeMovie.type}/${activeMovie.id}/${encodeURIComponent(activeMovie.slug)}`,
    );
  };

  return (
    <div className="relative w-full h-[43vh] sm:h-[62vh] md:h-[68vh] lg:h-[73vh] xl:h-[75vh] overflow-hidden">
      <Swiper
        loop={true}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {normalizeMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={movie.backdrop}
                alt={movie.title}
                loading="lazy" decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none z-10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-[22%] md:bottom-[28%] lg:bottom-[35%] left-0 right-0 z-30 px-6 sm:px-8 md:px-12 lg:px-16 pointer-events-none">
        <div className=" max-w-[92%] sm:max-w-[85%] md:max-w-[48%] lg:max-w-[45%]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-2xl mb-4 md:mb-6">
            {activeMovie?.title}
          </h2>

          <div className="flex items-center gap-3 my-7">
            <span className="bg-yellow-400 mt-1 text-black font-extrabold text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded tracking-wider">
              IMDB
            </span>

            <span className="text-white font-bold text-xl md:text-2xl">
              {activeMovie?.rating}
              <span className="text-lg md:text-xl font-normal opacity-75">/ 10</span>
            </span>
</div>
            <div className="pointer-events-auto">
              <button
                type="button"
                onClick={handlePlayClick}
                className="flex items-center gap-3 bg-white text-black font-bold rounded-lg p-2 md:px-5 md:py-2 text-sm md:text-lg hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_15px_rgba(250,255,255,0.5)] cursor-pointer"
              >
                <span>Watch</span>
                <div className="w-5 h-5 md:w-9 md:h-9 rounded-full bg-black flex items-center justify-center">
                  <Play className="w-3 h-3 md:w-4 md:h-4 text-white fill-white" />
                </div>
              </button>
            
          </div>
        </div>
      </div>

      <div className="absolute bottom-[22%] md:bottom-[28%] lg:bottom-[23%] left-0 -right-1/2 z-10 hidden md:flex justify-center gap-1 overflow-hidden py-0">
        {/* ✅ key تغییر کرد به id+index تا duplicate نشه */}
        {rotatedMovies.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            onClick={() => {
              const targetIndex = normalizeMovies.findIndex(
                (item) => item.id === movie.id,
              );
              swiperRef.current?.slideToLoop(targetIndex);
              setTimeout(() => {
                navigate(
                  `/${movie.type}/${movie.id}/${encodeURIComponent(movie.slug)}`,
                );
              }, 300);
            }}
            className={`cursor-pointer py-4 translate-x-1/2 relative hover:scale-110 transition duration-300 mx-1 ${
              index === 0
                ? "scale-105 opacity-100"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              loading="lazy" decoding="async"
              className="w-28 h-44 lg:w-48 lg:h-72 object-cover rounded-xl border border-white/20"
            />
            <div className="absolute bottom-4 left-0 right-0 bg-black/70 p-1 lg:py-3 rounded-b-xl">
              <div className="flex lg:flex-row md:flex-col  items-center justify-between px-1 lg:px-2 gap-1">
                <span
                  className={`flex  items-center text-xs md:px-1.5 md:py-0.5 lg:px-2 lg:py-1 rounded  ${
                    movie.type === "movie"
                      ? "bg-blue-500/80 text-white"
                      : "bg-purple-500/80 text-white"
                  }`}
                >
                  {movie.type === "movie" ? (
                    <>
                      <Film className="w-3.5 h-3.5 inline mr-1" />
                      MOVIE
                    </>
                  ) : (
                    <>
                      <Tv className="w-3.5 h-3.5 inline mr-1" />
                      TV
                    </>
                  )}
                </span>

                <p className="text-white text-xs py-1 rounded flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {movie.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;