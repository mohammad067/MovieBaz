import { useState, useEffect } from "react";
import { getMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import SkeletonGrid from "../components/SkeletonGrid";

function PageMovies(onError) {
  // لیست فیلم‌های صفحه جاری
  const [movies, setMovies] = useState([]);

  // شماره صفحه فعلی
  const [currentPage, setCurrentPage] = useState(1);

  // تعداد کل صفحات
  const [totalPages, setTotalPages] = useState(1);

  // وضعیت لودینگ
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // هر بار که شماره صفحه عوض شد، فیلم‌های جدید بگیر
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);

      try {
        const data = await getMovies(currentPage);
        setMovies(data.results || data); // بعضی API ها results برمی‌گردونن

        // اگر API تعداد صفحات رو برگردوند، از آن استفاده کن
        if (data.total_pages) {
          setTotalPages(Math.min(data.total_pages, 50)); // حداکثر ۵۰ صفحه
        } else {
          setTotalPages(20); // مقدار پیش‌فرض
        }
      } catch (err) {
        console.error("خطا در دریافت فیلم‌ها:", err);
        onError(true);
        setMovies([]);
        
        
      } finally {
        setLoading(false);
      }
    }

    loadMovies();

    // اسکرول به بالای صفحه
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // تولید شماره صفحات برای نمایش (مثلاً اطراف صفحه فعلی)
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
        {/* عنوان صفحه */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Movies</h1>
          <p className="text-slate-400 text-sm mt-1">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* حالت لودینگ */}
        {loading ? (
          <SkeletonGrid count={30} />
        ) : (
          <>
            {/* گرید فیلم‌ها */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {movies
                .filter((m) => m.poster_path)
                .map((movie) => (
                  <MovieCard key={movie.id} film={movie} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 mt-12 flex-wrap">
              {/* اولین صفحه */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                «
              </button>

              {/* قبلی */}
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ‹
              </button>

              {/* شماره صفحه اول + ... */}
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

              {/* شماره صفحات */}
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

              {/* ... + آخرین صفحه */}
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

              {/* بعدی */}
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ›
              </button>

              {/* آخرین صفحه */}
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