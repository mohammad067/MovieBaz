import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
       <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
      <Route path="/:type/:id/:slug" element={<MovieDetails/>} />
      </Routes>
      <Footer/> 
    </BrowserRouter>
     
  );
}

export default App;