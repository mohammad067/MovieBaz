import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function MovieGrid({ movies, hasSearched}) {
const filteredMovies = movies.filter((m) => m.poster_path);// فقط فیلم‌هایی که پوستر دارند رو نمایش بده

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
    <Swiper
                     // فاصله بین کارت‌ها (پیکسل)
                       // در حالت موبایل چندتا نمایش بده؟
      speed={400}   


      breakpoints={{
        192: { slidesPerView: 2, spaceBetween: 10 },    // موبایل خیلی کوچک
        320: { slidesPerView: 2.5, spaceBetween: 12 },   // موبایل کوچک
        480: { slidesPerView: 3, spaceBetween: 16 },   // موبایل متوسط
        640: { slidesPerView: 3.5, spaceBetween: 20 },  // تبلت
        768: { slidesPerView: 4.5, spaceBetween: 24 }, // تبلت بزرگ
        1024: { slidesPerView: 5, spaceBetween: 40 }, // دسکتاپ
        1280: { slidesPerView: 6, spaceBetween: 28 },// دسکتاپ بزرگ
      }}
      className="!py-4 !px-1.5 "
    >
      {filteredMovies.map((movie) => (
        <SwiperSlide key={movie.id}  >
          <MovieCard film={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieGrid;