import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

function Slider({ movies = [] }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderMovies = movies.slice(0, 4);

  // چرخش کارت‌ها
  const rotatedMovies = [
    ...sliderMovies.slice(activeIndex),
    ...sliderMovies.slice(0, activeIndex),
  ];
  if (!sliderMovies.length) return null;

  return (
    <div className="w-full mt-16 h-[70vh] md:h-[85vh]">
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
        className="w-full h-full "
      >
        {/* اسلاید اصلی */}
        {sliderMovies.map((movie) => {
          const title = movie.title || movie.name;

          const backdrop = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

          return (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-full ">
                <img
                  src={backdrop}
                  alt={title}
                  className="w-full h-full object-cover"
                />

                {/* افکت تاریکی */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* متن */}
                <div className="absolute max-w-3xl inset-0 z-10 flex items-end md:items-center justify-start px-6 md:px-16 pb-10 md:pb-0">
                  <div className="">
                    <h2 className="text-2xl md:text-6xl font-bold mb-5 drop-shadow-4xl">
                      {title}
                    </h2>

                    <div className="flex flex-col items-start gap-2">
                      <span className="bg-yellow-400 text-black font-extrabold text-sm px-3 py-1 rounded">
                        IMDB
                      </span>

                      <span className="text-white font-bold text-2xl">
                        {movie.vote_average?.toFixed(1)}
                        <span className="text-xl font-normal">/ 10</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* دکمه پلی */}
              </div>
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />

            </SwiperSlide>
          );
        })}
        <div className="absolute top-1/2 left-1/2 md:left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 ">
          <div className="relative flex items-center justify-center transform hover:scale-110 transition duration-300 animate-pulse hover:animate-none active:scale-90">
            <div className="absolute w-32 h-32 border border-white/30 rounded-full" />
            <div className="absolute w-44 h-44 border border-white/50 rounded-full" />

            <button className="relative w-20 h-20  md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-black text-2xl cursor-pointer">
              ▶
            </button>
          </div>
        </div>
        {/* کارت‌ها روی اسلایدر */}
        {/* همون جای قبلی خودت حفظ شده */}
        <div className="absolute bottom-1/4 left-0 -right-1/2 z-20 hidden md:flex justify-center gap-1 overflow-hidden py-3 ">
          {rotatedMovies.map((movie, index) => {
            const poster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

            return (
              <div
                key={movie.id}
                onClick={() =>
                  swiperRef.current.slideToLoop(
                    sliderMovies.findIndex((m) => m.id === movie.id)
                  )
                }
                className={`cursor-pointer py-4 translate-x-1/2 relative ${
                  index === 0
                    ? "scale-110 opacity-100 rounded-sm mx-4"
                    : "scale-90 opacity-50 hover:opacity-80 rounded-sm"
                }`}
              >
                <img
                  src={poster}
                  alt={movie.title || movie.name}
                  className="w-48 h-72 object-cover rounded-lg border border-white/20  "
                />
                <div className="absolute bottom-4 left-0 right-0 bg-black/70 p-2 rounded-b-lg">
                  <h3 className="text-white text-sm font-bold truncate">
                    {movie.title || movie.name}
                  </h3>
                  <p className="text-white text-xs mt-1  px-2 py-1 rounded w-fit j">
                    {" "}
                    📅 {movie.release_date || movie.first_air_date}{" "}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
}

export default Slider;
