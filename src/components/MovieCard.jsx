import { Type } from "lucide-react";
import { Link } from "react-router-dom";


function MovieCard({ film}) {

  const {
    poster_path,
    title,
    name,
    first_air_date,
    release_date,
    last_air_date,
    vote_average,
    

  } = film; 
  const movietitle = title || name;
  const date = last_air_date || release_date || first_air_date || "تاریخ نامشخص";
  const rating = vote_average !== undefined && vote_average !== null ? vote_average.toFixed(1) : "بدون امتیاز";
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : `https://placehold.co/500x750/0f172a/ffffff?text=${encodeURIComponent(movietitle)}`;

  return (
   <Link to={`/${film.media_type}/${film.id}`}>
      
    <div className="group bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer h-full border border-slate-800 relative">
      <div className="relative overflow-hidden w-full aspect-[2/3]">
        <img
          src={imageUrl}
          alt={`پوستر ${movietitle}`}
          className="object-cover transition-all duration-300 group-hover:scale-105 w-full h-full"
          loading="lazy"
        />

        {/*جزئیات که فقط موقع هاور ظاهر می‌شه */}
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