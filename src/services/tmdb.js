
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  async function fetchFromTMDB(endpoint, page=1) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}&language=en-US&append_to_response=production_countries`);


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

//  محبوب
export async function getPopularMovies() {
  const data = await fetchFromTMDB("/movie/popular");
  return addMediaType(data , "movie");
}

//  جدید (movie + tv)
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

//  سریال‌ها
export async function getTvShows(page = 1) {
  const [page1, page2] = await Promise.all([
    fetchFromTMDB(`/discover/tv`, page * 2 - 1),
    fetchFromTMDB(`/discover/tv`, page * 2),
  ]);

  const combined = [...page1, ...page2].slice(0, 30);
  return addMediaType(combined, "tv");
}

//  فیلم ها
export async function getMovies(page = 1) {
  const [page1, page2] = await Promise.all([
    fetchFromTMDB(`/discover/movie`, page * 2 - 1),
    fetchFromTMDB(`/discover/movie`, page * 2),
  ]);

  // ترکیب دو صفحه و برگرداندن 30 تای اول
  const combined = [...page1, ...page2];
  const uniqueMovies = Array.from(new Map(combined.map(item => [item.id, item])).values());
  return addMediaType(uniqueMovies.slice(0,30), "movie");
}
//  سرچ (movie + tv)
export async function searchMulti(query) {
  if (!query.trim()) return [];

  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
  );

  if (!res.ok) throw new Error("Search Error");

  const data = await res.json();

  //  movie و tvفیلتر 
  return data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
}
export async function getTrending(timeWindow = "week") {   
  const data = await fetchFromTMDB(`/trending/all/${timeWindow}`);

  //  بک‌دراپ 
  const filtered = data.filter(item => item.backdrop_path);

  return filtered.map((item) => ({
    ...item,
    media_type: item.media_type || (item.title ? "movie" : "tv"),
  }));
}

//  گرفتن دیتیل فیلم 
export async function getDetails(type, id) {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,similar,images,production_countries` //برای
  );

  if (!res.ok) throw new Error(`Failed to fetch ${type} details`);

  return res.json();
}