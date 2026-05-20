import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

function MovieGrid({ movies, hasSearched }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const filteredMovies = movies.filter((m) => m.poster_path);

  if (hasSearched && filteredMovies.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-white mb-2">No movie found</h2>
      </div>
    );
  }

  if (hasSearched) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-2">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} film={movie} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">

      {/* دکمه چپ */}
      {!isBeginning && (
        <button
          ref={prevRef}
          onClick={() => swiperInstance?.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
            w-7 h-7
            sm:w-8 sm:h-8
            md:w-10 md:h-10
            lg:w-12 lg:h-12
            bg-stone-950/70 hover:bg-stone-950/90 active:bg-stone-950
            text-white rounded-full flex items-center justify-center
            shadow-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      )}

      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        speed={400}
        breakpoints={{
          0:    { slidesPerView: 1.5, spaceBetween: 9 },
          192:  { slidesPerView: 2,   spaceBetween: 10 },
          320:  { slidesPerView: 2.5, spaceBetween: 12 },
          480:  { slidesPerView: 3,   spaceBetween: 16 },
          640:  { slidesPerView: 3.5, spaceBetween: 20 },
          768:  { slidesPerView: 4.5, spaceBetween: 24 },
          1024: { slidesPerView: 5,   spaceBetween: 40 },
          1280: { slidesPerView: 6,   spaceBetween: 28 },
        }}
        className="!py-4 !px-1.5"
      >
        {filteredMovies.map((movie, index) => (
          <SwiperSlide key={`${movie.media_type}-${movie.id}-${index}`}>
            <MovieCard film={movie} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه راست */}
      {!isEnd && (
        <button
          ref={nextRef}
          onClick={() => swiperInstance?.slideNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
            w-7 h-7
            sm:w-8 sm:h-8
            md:w-10 md:h-10
            lg:w-12 lg:h-12
            bg-stone-950/70 hover:bg-stone-950/90 active:bg-stone-950
            text-white rounded-full flex items-center justify-center
            shadow-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      )}

    </div>
  );
}

export default MovieGrid;