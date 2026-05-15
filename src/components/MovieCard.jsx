import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ film }) {
  const {
    poster_path,
    title,
    name,
    first_air_date,
    release_date,
    last_air_date,
    vote_average,
    media_type,
    id,
  } = film;

  // عنوان فیلم یا سریال
  const movietitle = title || name || "unknown";

  // تشخیص type
  const type = media_type || (title ? "movie" : "tv");

  // تاریخ
  const date =
    last_air_date ||
    first_air_date ||
    release_date ||
    "تاریخ نامشخص";

  // امتیاز
  const rating =
    vote_average !== undefined && vote_average !== null
      ? vote_average.toFixed(1)
      : "بدون امتیاز";

  // عکس
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : `https://placehold.co/500x750/0f172a/ffffff?text=${encodeURIComponent(
        movietitle
      )}`;

  // slug برای URL
  const slug = movietitle
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]+/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+$/g, "-");

  return (
    <Link to={`/${type}/${id}/${encodeURIComponent(slug)}`}>
      <div className="group bg-stone-800/90 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer h-full border-2 border-slate-500 relative">

        <div className="relative overflow-hidden w-full aspect-[2/3] rounded">
          <img
            src={imageUrl}
            alt={`پوستر ${movietitle}`}
            className="object-cover transition-all duration-300 group-hover:scale-105 w-full h-full "
            loading="lazy"
          />

          {/* Hover Details */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-3 md:p-4">

            <h2 className="text-sm md:text-lg font-bold text-white mb-1 truncate">
              {movietitle}
            </h2>

            <p className="text-xs md:text-sm text-slate-300 mb-1">
              {date}
            </p>

            <p className="text-xs md:text-sm text-yellow-400 font-semibold flex items-center gap-1">
              ⭐ {rating}
            </p>

          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;

