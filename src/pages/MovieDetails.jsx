import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../services/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, FreeMode } from "swiper/modules";
function MovieDetails() {
  const { id, type, slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await getDetails(type, id);
        setData(res);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, type]);

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error loading data</p>;
  if (!data) return null;

  const title = data.title || data.name;
  const date = data.release_date || data.first_air_date;
  const backdropUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${data.poster_path}`;

  const cast = data.credits?.cast || [];

  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      <div className="relative top-16 w-full min-h-screen md:min-h-[600px] flex items-end">
        {backdropUrl && (
          <>
            <img
              src={backdropUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlays: تیره کردن پس‌زمینه برای خوانایی متن */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30 " />
          </>
        )}

        {/* محتوا */}
        {/* Container: حداکثر عرض و فاصله از لبه‌ها */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 w-full">
          {/* Flex: در موبایل ستون، در دسکتاپ ردیف */}
          <div className="flex flex-col sm:flex-row md:flex-row gap-8 items-start sm:items-start md:items-start">

            {/* Poster: سایز داینامیک و وسط‌چین در موبایل */}
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={title}
                className="w-56 sm:w-64 md:w-80 rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Info: تراز متن در موبایل وسط، در دسکتاپ چپ */}
            <div className="flex flex-col gap-4 text-start md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
                {title}
              </h1>

              <div className="flex flex-wrap justify-start items-center gap-4 text-sm sm:text-base text-slate-300">
                <span className="flex items-center gap-1  ">📅 {date?.split('-').join('/')}</span>
                <span className="flex items-center gap-1 text-yellow-400 font-bold">
                  ⭐ {data.vote_average?.toFixed(1)}
                </span>
                <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20">
                  {data.status}
                </span>
              </div>

              {/* ژانرها */}
              <div className="flex flex-wrap justify-start md:justify-start gap-3">
                {data.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-medium transition hover:bg-indigo-500/20 cursor-pointer"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed mt-2 italic opacity-90">
                {data.tagline}
              </p>

              <div className="mt-2">
                <h3 className="text-lg font-semibold mb-1">Overview</h3>
                <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed ">
                  {data.overview}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className=" mt-16 gap-6 max-w-8xl mx-auto px-4 py-2 max-w-7xl ">
        <h3 className="text-lg font-semibold mb-2">Top Cast</h3>
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 p-4 rounded ">


          <Swiper
            modules={[Navigation, Pagination, FreeMode]}
            spaceBetween={12}
            slidesPerView={2}
            freeMode={true}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 8 },
              480: { slidesPerView: 3, spaceBetween: 10 },
              640: { slidesPerView: 4, spaceBetween: 12 },
              768: { slidesPerView: 5, spaceBetween: 14 },
              1024: { slidesPerView: 6, spaceBetween: 10 },
              1280: { slidesPerView: 8, spaceBetween: 10 },
            }}
            className="py-4 "
          >

            {cast.map((c) => (
              <SwiperSlide key={c.id}>
                <div className="flex flex-col items-center text-center py-1 cursor-pointer">

                  <img
                    src={
                      c.profile_path
                      ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
                      : `https://placehold.co/500x750/0f172a/ffffff?text=${encodeURIComponent(c.name)}`

                  }
                    alt={c.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-white/20 shadow-lg hover:scale-105 transition-transform duration-300"
                  />

                  <p className="text-white font-medium mt-2 text-sm line-clamp-2">
                    {c.name}
                  </p>

                  <p className="text-slate-400 text-xs line-clamp-2 mt-1">
                    {c.character}
                  </p>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>




    </div>
  );
}

export default MovieDetails;