import { useState, useEffect } from "react";
import { getMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import SkeletonGrid from "../components/SkeletonGrid";
import { useError } from "../context/ErrorContext"; 

function PageMovies() {


  
  const [movies, setMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
const { triggerError } = useError();
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);

      try {
        const data = await getMovies(currentPage);
        setMovies(data.results || data); 

        if (data.total_pages) {
          setTotalPages(Math.min(data.total_pages, 50)); 
        } else {
          setTotalPages(20);
        }
      } catch (err) {
        console.error("خطا در دریافت فیلم‌ها:", err);
        triggerError("Failed to load movies.");
        setMovies([]);
        
        
      } finally {
        setLoading(false);
      }
    }

    loadMovies();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  function getPageNumbers() {
    const delta = 2;
    const pages = [];
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  return (
    <div className="min-h-screen bg-stone-800/90 text-white overflow-x-hidden pt-24 pb-12">
      <main className="max-w-8xl mx-auto md:mx-24 px-4 py-8 overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Movies</h1>
          <p className="text-slate-400 text-sm mt-1">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {loading ? (
          <SkeletonGrid count={30} />
        ) : (
          <>
         
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {movies
                .filter((m) => m.poster_path)
                .filter((m ,index ,self)=> index === self.findIndex((t) => t.id === m.id))
                .map((movie) => (
                  <MovieCard key={movie.id} film={movie} />
                ))}
            </div>

            
            <div className="flex items-center justify-center gap-1 sm:gap-2 mt-12 flex-wrap">
              
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                «
              </button>

          
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ‹
              </button>

            
              {getPageNumbers()[0] > 1 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    1
                  </button>
                  {getPageNumbers()[0] > 2 && (
                    <span className="px-2 text-slate-500">...</span>
                  )}
                </>
              )}

   
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-white text-slate-900"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  {page}
                </button>
              ))}

             
              {getPageNumbers().at(-1) < totalPages && (
                <>
                  {getPageNumbers().at(-1) < totalPages - 1 && (
                    <span className="px-2 text-slate-500">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}

            
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ›
              </button>

            
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                »
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default PageMovies;