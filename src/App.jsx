import { useState, useEffect } from "react";
import {BrowserRouter,Routes,Route,Navigate,useLocation,} from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import PageMovies from "./pages/PageMovies";
import MovieGrid from "./components/MovieGrid";

import { searchMulti as searchMovies } from "./services/tmdb";
import PageSeries from "./pages/PageSeries";
import { ErrorProvider, useError } from "./context/ErrorContext";

function AppContent() {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const location = useLocation();
const { globalError, clearError } = useError();
  // هر وقت صفحه تغییر کنه، overlay سرچ بسته شه
  useEffect(() => {
    setHasSearched(false);
  }, [location.pathname]);

  const handleSearch = async (text) => {
    // اگر سرچ خالی شد
    if (!text?.trim()) {
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
      setGlobalError({message: "Check your internet connection and try again.",});
    }
  };
    if (globalError) {
    return (
      <div className="min-h-screen bg-stone-800/90 flex items-center justify-center px-4">
<div className="w-full max-w-sm rounded-2xl border border-red-500 bg-red-500/20 p-4 text-center shadow-2xl animate-pulse">
          <div className="mb-4 text-5xl">⚠️</div>

          <h1 className="mb-2 text-2xl font-bold text-red-300">
            Connection Error
          </h1>

          <p className="text-sm text-red-200/80">
            {globalError.message}
          </p>
          <button onClick={() => { clearError(); window.location.reload(); }}


             className="mt-6 rounded-xl bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600" > Retry 
          
          </button>
        </div>    
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      
      <Navbar onSearch={handleSearch} />

      {/* overlay سرچ */}
      {hasSearched && (
        <div className="fixed inset-0 z-[60] bg-slate-950/95 pt-28 px-4 overflow-y-auto">
          <div className="max-w-8xl mx-24">
            <div className="inline-flex items-center justify-center bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 mb-6">
              <h2 className="text-lg md:text-2xl">Search Results</h2>
            </div>

            <MovieGrid
              movies={searchResults.slice(0, 100)}
              hasSearched={true}
            />
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home/>}/>
        <Route path="/movies" element={<PageMovies/>} />
        <Route path="/series" element={<PageSeries/>} />

        <Route path="/:type/:id/:slug" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

// BrowserRouter رو اینجا wraps کردیم تا useLocation توی AppContent جواب بده
function App() {
  return (
    <BrowserRouter>
    <ErrorProvider><AppContent /></ErrorProvider>
      
    </BrowserRouter>
  );
}

export default App;
