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

  const filteredMovies = movies.filter((m) => m.poster_path);

  if (hasSearched && filteredMovies.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-white mb-2">فیلمی یافت نشد</h2>
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
    <div className="relative group/slider">
      {/* دکمه چپ */}
      <button
        ref={prevRef}
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-stone-950/60 active:bg-stone-950/90 text-white rounded-full flex items-center justify-center"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <Swiper
        modules={[Navigation]}
        onSwiper={setSwiperInstance}
        speed={400}
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 9 },
          192: { slidesPerView: 2, spaceBetween: 10 },
          320: { slidesPerView: 2.5, spaceBetween: 12 },
          480: { slidesPerView: 3, spaceBetween: 16 },
          640: { slidesPerView: 3.5, spaceBetween: 20 },
          768: { slidesPerView: 4.5, spaceBetween: 24 },
          1024: { slidesPerView: 5, spaceBetween: 40 },
          1280: { slidesPerView: 6, spaceBetween: 28 },
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
      <button
        ref={nextRef}
        onClick={() => swiperInstance?.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-stone-950/60 active:bg-stone-950/90 text-white rounded-full flex items-center justify-center"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}

export default MovieGrid;
