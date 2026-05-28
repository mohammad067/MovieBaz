import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../services/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { Play, CalendarDays, Globe, X } from "lucide-react";

import SkeletonDetails from "../components/SkeletonDetails";

function MovieDetails() {
  const { id, type } = useParams();

  const [data, setData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  // TV States
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Main Details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const res = await getDetails(type, id);

        setData(res);
        setVideos(res.videos?.results || []);

        // Default season
        if (type === "tv" && res.seasons?.length > 0) {
          const firstSeason =
            res.seasons.find((s) => s.season_number > 0) || res.seasons[0];

          setSelectedSeason(firstSeason.season_number);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]);

  // Fetch Episodes When Season Changes
  useEffect(() => {
    const fetchEpisodes = async () => {
      if (type !== "tv") return;

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US`,
        );

        const seasonData = await res.json();

        const eps = seasonData.episodes || [];

        setEpisodes(eps);

        // Auto select first episode
        if (eps.length > 0) {
          setSelectedEpisode(eps[0].episode_number);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchEpisodes();
  }, [selectedSeason, id, type]);

  if (loading) return <SkeletonDetails />;

  if (error || !data) {
    return <p className="text-red-500 text-center mt-10">Error loading data</p>;
  }

  const title = data.title || data.name;
  const date = data.release_date || data.first_air_date;

  const backdropUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${data.poster_path}`;

  const cast = data.credits?.cast || [];

  // ==================== تریلر ====================
  // پیدا کردن بهترین تریلر یوتیوب
  const trailer = videos.find(v => 
    v.type === "Trailer" && v.site === "YouTube"
  ) || videos.find(v => v.site === "YouTube") || null;

  const trailerKey = trailer ? trailer.key : null;
  // ===============================================

  // SmashyStream Player URL
  const getEmbedUrl = () => {
    if (type === "movie") {
      return `https://embed.smashystream.com/playere.php?tmdb=${id}`;
    } else {
      return `https://embed.smashystream.com/playere.php?tmdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`;
    }
  };

  const handleWatch = () => {
    setShowPlayer(true);
  };

  const productionCountries = data.production_countries || [];

  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-stone-600/70 via-stone-700/80 to-stone-800/90">
      <div className="relative top-0 w-full min-h-screen md:min-h-[650px] flex items-end">
        {backdropUrl && (
          <>
            <img
              src={backdropUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy" 
              decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-950/30" />
          </>
        )}

        <div className="relative z-10 max-w-8xl mx-auto md:mx-24 px-4 py-10 w-full">
          <div className="flex flex-col mt-2 sm:flex-row md:items-start gap-8 items-center">
            <div className="flex-shrink-0 lg:mt-0 mt-5">
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={title}
                loading="lazy" 
                decoding="async"
                className="w-56 sm:w-64 md:w-80 rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            <div className="flex flex-col gap-4 text-start md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
                {title}
              </h1>

              <div className="flex flex-wrap justify-start items-center gap-4 text-sm sm:text-base text-slate-300">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-5 h-5" />
                  {date?.split("-").join("/")}
                </span>

                <span className="flex items-center gap-1 text-yellow-400 font-bold">
                  ⭐ {data.vote_average?.toFixed(1)}
                </span>
                {productionCountries.length > 0 && (
                  <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded border border-white/20">
                    <Globe className="w-4 h-4" />
                    {productionCountries
                      .map((c) => c.name || c.iso_3166_1)
                      .join(", ")}
                  </span>
                )}

                <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20">
                  {data.status}
                </span>
              </div>

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

              {data.tagline && (
                <p className="text-slate-300 text-lg italic opacity-90">
                  {data.tagline}
                </p>
              )}

              {/* Season & Episode Select */}
              {type === "tv" && (
                <div className="flex gap-4 mt-3">
                  {/* Seasons */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      Season
                    </label>

                    <select
                      value={selectedSeason}
                      onChange={(e) =>
                        setSelectedSeason(Number(e.target.value))
                      }
                      className="bg-stone-800 text-white px-4 py-2 rounded-lg border border-white/20"
                    >
                      {data.seasons
                        ?.filter((season) => season.season_number > 0)
                        .map((season) => (
                          <option key={season.id} value={season.season_number}>
                            فصل {season.season_number}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Episodes */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      Episode
                    </label>

                    <select
                      value={selectedEpisode}
                      onChange={(e) =>
                        setSelectedEpisode(Number(e.target.value))
                      }
                      className="bg-stone-800 text-white px-4 py-2 rounded-lg border border-white/20"
                    >
                      {episodes.map((ep) => (
                        <option key={ep.id}>قسمت {ep.episode_number}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* ==================== دکمه‌های پخش ==================== */}
              <div className="flex flex-wrap gap-3 mt-4">
                {/* Watch Now Button (فیلم کامل) */}
                <button
                  onClick={handleWatch}
                  className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all duration-300 text-white text-lg font-semibold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 w-fit"
                >
                  Watch Now
                  <Play className="text-2xl" fill="white" />
                </button>

                {/* Watch Trailer Button */}
                {trailerKey ? (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 transition-all duration-300 text-white text-lg font-semibold px-8 py-3.5 rounded-2xl backdrop-blur-sm"
                  >
                    Watch Trailer
                    <Play className="text-2xl" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-3 bg-white/5 text-slate-400 px-8 py-3.5 rounded-2xl cursor-not-allowed"
                  >
                    No Trailer Available
                  </button>
                )}
              </div>
              {/* ==================================================== */}

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

      {/* Player Modal - پخش کامل فیلم */}
      {showPlayer && (
        <div className="fixed inset-0 mt-0 bg-black/95 z-10 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-12 right-2 bg-slate-500 rounded-full transition-colors z-50 "
            >
              <X className="size-10 text-white hover:text-red-500" />
            </button>

            <div className="aspect-video bg-black rounded-2xl mt-16 overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl()}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Trailer Modal - پخش تریلر */}
      {showTrailer && trailerKey && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-12 right-2 bg-slate-500 rounded-full transition-colors z-50 "
            >
              <X className="size-10 text-white hover:text-red-500" />
            </button>

            <div className="aspect-video bg-black rounded-2xl mt-16 overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
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

        <div className="bg-stone-900/50 backdrop-blur-md border border-white/15 p-4 rounded-md">
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 8 },
              320: { slidesPerView: 2, spaceBetween: 8 },
              480: { slidesPerView: 3, spaceBetween: 10 },
              640: { slidesPerView: 4, spaceBetween: 12 },
              768: { slidesPerView: 5, spaceBetween: 14 },
              1024: { slidesPerView: 8, spaceBetween: 10 },
              1280: { slidesPerView: 9, spaceBetween: 12 },
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
                    loading="lazy" 
                    decoding="async"
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