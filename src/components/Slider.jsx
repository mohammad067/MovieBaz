import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { title } from "framer-motion/client";

function Slider({ movies = [] }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full mt-16 h-[70vh] md:h-[85vh]">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2000 }}
        
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"

      >
        {/**/}
        {movies.slice(0, 5).map((movie) => {
          const title = movie.title || movie.name;

          const backdrop = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "";
          return (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-full">
                <img
                  src={backdrop}
                  alt={title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 z-10 flex items-end md:items-center justify-start px-6 md:px-16 pb-10 md:pb-0">

                  {/* TEXT */}
                  <div className="max-w-xl">
                    <h2 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-4xl">
                      {title}
                    </h2>

                    <div className="flex flex-col items-start gap-2">
                      <span className="bg-yellow-400 text-black font-extrabold text-sm px-3 py-1 rounded">
                        IMDB
                      </span>
                      <span className="text-white font-extrabold text-lg">
                        {movie.vote_average?.toFixed(1)} /10
                      </span>
                    </div>
                  </div>

                </div>



              </div>



            </SwiperSlide>
            
          );
          
        })}
                        <div className="absolute top-1/2 left-1/2 md:left-[35%] -translate-x-1/2 -translate-y-1/2 z-20">

<div className="relative flex items-center justify-center hover:scale-110 transition duration-300 animate-pulse hover:animate-none active:scale-90">

  {/* حلقه‌ها */}
  <div className="absolute w-32 h-32 border border-white/30 rounded-full " />
  <div className="absolute w-44 h-44 border border-white/50 rounded-full " />

  {/* دکمه */}
  <button className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-black text-2xl cursor-pointer ">
    ▶
  </button>

</div>
</div>
      <div className="absolute bottom-1/3 left-0 -right-1/2 z-30 hidden md:flex justify-center  gap-2 overflow-hidden">

        {movies.slice(0, 5).map((movie, index) => {
          const poster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

          return (
            <div
              key={movie.id}
              onClick={() => swiperRef.current.slideToLoop(index)}
              className={`cursor-pointer transition-all duration-300 ${activeIndex === index
                  ? " opacity-100 rounded-sm p-4"
                  : "scale-90 opacity-50 hover:opacity-80"
                }`}
            >
              <img
                src={poster}
                alt={movie.title || movie.name }
                className="w-full  h-full object-cover rounded-lg border border-white/20 shadow-lg "
              />
            </div>
          );
        })}

      </div>
      </Swiper>


    </div>

  );
}

export default Slider;