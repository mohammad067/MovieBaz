const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// تابع fetch ساده
async function fetchFromTMDB(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);


  if (!res.ok) throw new Error("API Error");

  const data = await res.json();
  return data.results;
}

// اضافه کردن type به دیتا
function addMediaType(items, type) {
  return items.map((item) => ({
    ...item,
    media_type: item.media_type || type,
  }));
}

// 🔥 محبوب
export async function getPopularMovies() {
  const data = await fetchFromTMDB("/movie/popular");
  return addMediaType(data);
}

// 🔥 جدید (movie + tv)
export async function getNowPlayingMovies() {
  const [movies, tv] = await Promise.all([
    fetchFromTMDB("/movie/now_playing"),
    fetchFromTMDB("/tv/on_the_air"),
  ]);

  const combined = [...movies, ...tv];



  // مرتب بر اساس تاریخ
  const sorted = combined.sort((a, b) => {
    const dateA = new Date(
      a.release_date || a.first_air_date || 0
    );
    const dateB = new Date(
      b.release_date || b.first_air_date || 0
    );
    return dateB - dateA;
  });

  return sorted.map((item) => ({
    ...item,
    media_type: item.media_type || (item.title ? "movie" : "tv"),
  }));
}

// 🔥 سریال‌ها
export async function getTvShows() {
  const data = await fetchFromTMDB("/discover/tv");
  return addMediaType(data, "tv");
}
// 🔥 فیلم ها
export async function getMovies() {
  const data = await fetchFromTMDB("/discover/movie");
  return addMediaType(data, "movie");
}
// 🔍 سرچ (movie + tv)
export async function searchMulti(query) {
  if (!query.trim()) return [];

  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
  );

  if (!res.ok) throw new Error("Search Error");

  const data = await res.json();

  // فقط movie و tv
  return data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
}
export async function getTrending(timeWindow = "week") {   // week بهتره برای اسلایدر
  const data = await fetchFromTMDB(`/trending/all/${timeWindow}`);

  // فقط مواردی که بک‌دراپ دارند
  const filtered = data.filter(item => item.backdrop_path);

  return filtered.map((item) => ({
    ...item,
    media_type: item.media_type || (item.title ? "movie" : "tv"),
  }));
}

// 🎬 گرفتن جزئیات (داینامیک)
export async function getDetails(type, id) {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`
  );

  if (!res.ok) throw new Error("Details Error");

  return res.json();
}