import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { Library } from './pages/Library';
import { Quiz } from './pages/Quiz';
import { Blog } from './pages/Blog';
import { Quotes } from './pages/Quotes';
import { Mindmap } from './pages/Mindmap';
import { Ask } from './pages/Ask';

// Scroll to top on route change wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  // Global GSAP Config if needed
  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="bg-cnxh-black min-h-screen text-cnxh-light font-sans selection:bg-cnxh-red selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/library" element={<Library />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/mindmap" element={<Mindmap />} />
            <Route path="/ask" element={<Ask />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
