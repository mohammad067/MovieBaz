import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import SkeletonGrid from "../components/SkeletonGrid";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useError } from "../context/ErrorContext"; 

import {
  getPopularMovies,
  getTvShows,
  getNowPlayingMovies,
  searchMulti as searchMovies,
  getTrending,
  getMovies,
} from "../services/tmdb";

import Slider from "../components/Slider";
import SkeletonSlider from "../components/SkeletonSlider";

function Home() {
  const [PopularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);

  
  const [loading, setLoading] = useState(true);
  const { triggerError } = useError();


  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const popular = await getPopularMovies();
        const nowPlaying = await getNowPlayingMovies();
        const tv = await getTvShows();
        const trending = await getTrending();
        const discoverMovies = await getMovies();

        setPopularMovies(popular);
        setNowPlayingMovies(nowPlaying);
        setTvShows(tv);
        setTrendingMovies(trending);
        setDiscoverMovies(discoverMovies);
      } catch (error) {
        console.error(error);
        triggerError(" Failed to load homepage data. ");
      } finally {
        // خاموش کردن لودینگ  در هر حالت
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);


  return (
    <div className="min-h-screen bg-stone-800/90 text-white overflow-x-hidden">
      {loading ?( <SkeletonSlider /> ):( <Slider movies={trendingMovies} />)}

      <main className="max-w-8xl mx-auto md:mx-24 px-4 py-8 overflow-x-hidden">
        <div className="space-y-2 flex flex-col">
          <section>
            <div className="flex items-center mb-4 mx-1 gap-4">
            
              <h2 className="text-sm sm:text-lg md:text-xl lg:text-3xl font-bold tracking-widest uppercase text-white/90">
                Popular
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-white/20 to-transparent" />
            </div>

            {/* اگه لودینگ بود skeleton نشون بده، وگرنه گرید واقعی */}
            {loading ? (
              <SkeletonGrid count={6} />
            ) : (
              <MovieGrid movies={trendingMovies} hasSearched={false} />
            )}
          </section>

          <section>
            <div className="flex items-center mb-4 mx-1 gap-4">
          
              <h2 className="text-sm sm:text-lg md:text-xl lg:text-3xl font-bold tracking-widest uppercase text-white/90">
                New
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-white/20 to-transparent" />
            </div>
            {loading ? (
              <SkeletonGrid count={6} />
            ) : (
              <MovieGrid movies={nowPlayingMovies} hasSearched={false} />
            )}
          </section>

          <section>
            <div className="flex items-center mb-4 mx-1 gap-4">
              <h2 className="text-sm sm:text-lg md:text-xl lg:text-3xl font-bold tracking-widest uppercase text-white/90">
                Series
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              <Link
                to="/series"
                className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/40 hover:text-white/80 border border-white/20 hover:border-white/40 px-3 py-1.5 rounded-lg transition-all duration-300 group"
              >
                See All
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            {loading ? (
              <SkeletonGrid count={6} />
            ) : (
              <MovieGrid movies={tvShows} hasSearched={false} />
            )}
          </section>

          <section>
            <div className="flex items-center mb-4 mx-1 gap-4">
              <h2 className="text-sm sm:text-lg md:text-xl lg:text-3xl font-bold tracking-widest uppercase text-white/90">
                Movies
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              <Link
                to="/movies"
                className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/40 hover:text-white/80 border border-white/20 hover:border-white/40 px-3 py-1.5 rounded-lg transition-all duration-300 group"
              >
                See All
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            {loading ? (
              <SkeletonGrid count={6} />
            ) : (
              <MovieGrid movies={discoverMovies} hasSearched={false} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
