import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../services/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { Play,ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

function MovieDetails() {
  const { id, type } = useParams();

  const [data, setData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const res = await getDetails(type, id);

        setData(res);
        setVideos(res.videos?.results || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  if (error || !data) {
    return <p className="text-red-500 text-center mt-10">Error loading data</p>;
  }

  const title = data.title || data.name;

  const date = data.release_date || data.first_air_date;

  const backdropUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${data.poster_path}`;

  const cast = data.credits?.cast || [];

  // پیدا کردن بهترین تریلر
  const trailer =
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos.find((v) => v.site === "YouTube") ||
    videos[0] ||
    null;

  // ساخت لینک iframe
  const getTrailerUrl = (video) => {
    if (!video) return "";

    switch (video.site) {
      case "YouTube":
        return `https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0`;

      case "Vimeo":
        return `https://player.vimeo.com/video/${video.key}?autoplay=1`;

      default:
        return "";
    }
  };

  // باز کردن تریلر
  const handleTrailer = () => {
    if (!trailer) return;

    // اگر یوتیوب بود داخل مودال باز شه
    if (trailer.site === "YouTube" || trailer.site === "Vimeo") {
      setShowTrailer(true);
      return;
    }

    // fallback => سایت TMDB
    window.open(
      `https://www.themoviedb.org/${type}/${id}#play=${trailer.key}`,
      "_blank",
    );
  };

  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-stone-600/70 via-stone-700/80 to-stone-800/90">
      {/* Hero Section */}
      <div className="relative top-0 w-full min-h-screen md:min-h-[650px] flex items-end">
        {backdropUrl && (
          <>
            <img
              src={backdropUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-950/60 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-sotne-950/80 to-stone-950/30" />
          </>
        )}

        <div className="relative z-10 max-w-8xl mx-auto md:mx-24 px-4 py-10 w-full">
                        <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
>
  <ArrowLeft className="w-5 h-5" />
  <span className="text-sm">Back</span>
</button>
          <div className="flex flex-col mt-2 sm:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={title}
                className="w-56 sm:w-64 md:w-80 rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Information */}
            <div className="flex flex-col gap-4 text-start md:text-left">

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
                {title}
              </h1>

              <div className="flex flex-wrap justify-start items-center gap-4 text-sm sm:text-base text-slate-300">
                <span className="flex items-center gap-1">
                  📅 {date?.split("-").join("/")}
                </span>

                <span className="flex items-center gap-1 text-yellow-400 font-bold">
                  ⭐ {data.vote_average?.toFixed(1)}
                </span>

                <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20">
                  {data.status}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3">
                {data.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-medium hover:bg-indigo-500/20 transition"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              {data.tagline && (
                <p className="text-slate-300 text-lg italic opacity-90">
                  {data.tagline}
                </p>
              )}

              {/* Trailer Button */}
              {trailer && (
                <button
                  onClick={handleTrailer}
                  className="mt-4 inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all duration-300 text-white text-lg font-semibold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 w-fit"
                > Watch Trailer
                  <Play className="text-2xl" fill="white"/>
                 
                </button>
              )}

              {/* Overview */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>

                <p className="text-slate-400 max-w-3xl leading-relaxed">
                  {data.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white text-5xl hover:text-red-500 transition-colors z-10"
            >
              ✕
            </button>

            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={getTrailerUrl(trailer)}
                title={`${title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Top Cast */}
      <div className="mt-2 max-w-8xl mx-auto md:mx-24 px-4 py-2">
        <h3 className="text-lg font-semibold mb-4">Top Cast</h3>

        <div className="bg-stone-900/50 backdrop-blur-md  border border-white/15 p-4 rounded-md">
          <Swiper
            modules={[Navigation, Pagination, FreeMode]}
            spaceBetween={12}
            slidesPerView={2}
            freeMode={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 8,
                spaceBetween: 10,
              },
            }}
            className="py-4"
          >
            {cast.map((c) => (
              <SwiperSlide key={c.id}>
                <div className="flex flex-col items-center text-center py-1 cursor-pointer">
                  <img
                    src={
                      c.profile_path
                        ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
                        : `https://placehold.co/500x750/0f172a/ffffff?text=${encodeURIComponent(
                            c.name,
                          )}`
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
