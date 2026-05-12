// نرمال‌سازی اطلاعات فیلم و سریال
// برای اینکه همه‌جا دیتای یک‌شکل داشته باشیم

export function normalizeMovie(movie) {

  // گرفتن عنوان
  // title برای فیلم
  // name برای سریال
  const title = movie.title || movie.name || "unknown";

  // تشخیص نوع محتوا
  // movie یا tv
  const type =
    movie.media_type || (movie.title ? "movie" : "tv");

  // ساخت slug برای URL
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]+/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  // گرفتن تاریخ
  // release_date برای فیلم
  // first_air_date برای سریال
  const date =
    movie.release_date ||
    movie.first_air_date ||
    "Unknown";

  // امتیاز فیلم
  const rating =
    movie.vote_average !== undefined &&
    movie.vote_average !== null
      ? movie.vote_average.toFixed(1)
      : "N/A";

  // پوستر کوچک
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://placehold.co/500x750/0f172a/ffffff?text=${encodeURIComponent(title)}`;

  // تصویر بک‌گراند
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : poster;

  return {
    ...movie,

    // دیتاهای نرمال‌شده
    title,
    type,
    slug,
    date,
    rating,
    poster,
    backdrop,
  };
}