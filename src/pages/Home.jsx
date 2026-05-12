import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import {
  getPopularMovies,
  getTvShows,
  getNowPlayingMovies,
  searchMulti as searchMovies,
  getTrending,
  getMovies,
} from "../services/tmdb";
import Slider from "../components/Slider";

function Home() {
  const [PopularMovies, setPopularMovies] = useState([]);


  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [discoverMovies, setdiscoverMovies] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
      const popular = await getPopularMovies();
        const nowPlaying = await getNowPlayingMovies();
        const tv = await getTvShows();
        const trending = await getTrending();
        const discoverMovies =await getMovies();

        setPopularMovies(popular);
        setNowPlayingMovies(nowPlaying);
        setTvShows(tv);
        setTrendingMovies(trending);
        setdiscoverMovies(discoverMovies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomeData();
  }, []);

  const handleSearch = async (text) => {
    // اگر خالی بود، برگرد به حالت عادی هوم
    if (!text.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    try {
      const results = await searchMovies(text);
      setSearchResults(results);
      setHasSearched(true);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden ">
      {!hasSearched && (
        <Slider movies={PopularMovies} onSearch={handleSearch} />
        
      )}<SearchBar onSearch={handleSearch} />
      <main className="max-w-7xl mx-auto px-4 py-8 overflow-x-hidden ">
        

        {hasSearched ? (
          <section className="mt-16 space-y-4">
            <div className="inline-flex items-center mt-14 justify-center bg-slate-800 px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 rounded-lg border border-slate-700 ">
              <h2 className="text-xs sm:text-lg md:text-2xl leading-none -translate-y-0.5">
                Search Results
              </h2>
            </div>
            <MovieGrid
              movies={searchResults.slice(0, 100)}
              hasSearched={true}
            />
          </section>
        ) : (
          <div className="space-y-2 flex flex-col ">
            <section>
              <div className="inline-flex items-center justify-center bg-slate-800 px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 rounded-lg mx-1  border border-slate-700">
                <h2 className="text-xs sm:text-lg md:text-2xl leading-none -translate-y-0.5">
                  Popular
                </h2>
              </div>
              <MovieGrid movies={trendingMovies} hasSearched={false} />
            </section>

            <section>
              <div className="inline-flex items-center justify-center bg-slate-800 px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 rounded-lg mx-1">
                <h2 className="text-xs sm:text-lg md:text-2xl leading-none -translate-y-0.5">
                  New
                </h2>
              </div>
              <MovieGrid movies={nowPlayingMovies} hasSearched={false} />
            </section>

            <section>
              <div className="inline-flex items-center justify-center bg-slate-800 px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 rounded-lg mx-1">
                <h2 className="text-xs sm:text-lg md:text-2xl leading-none">
                  {" "}
                  TV Shows
                </h2>
              </div>
              <MovieGrid movies={tvShows} hasSearched={false} />
            </section>

            <section>
              <div className="inline-flex items-center justify-center bg-slate-800 px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 rounded-lg mx-1">
                <h2 className="text-xs sm:text-lg md:text-2xl leading-none">
                  {" "}
                  Movies
                </h2>
              </div>
              <MovieGrid movies={discoverMovies} hasSearched={false} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;