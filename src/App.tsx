import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Leadership from './components/Leadership';
import Blog from './components/Blog';
import BlogsPage from './components/BlogsPage';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import { useTheme } from './context/ThemeContext';
import Games from './pages/Games';
import InteractiveBallsGame from './pages/games/InteractiveBallsGame';
import StackGame from './pages/games/StackGame';

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen w-full transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
      }`}>
        <div className="fixed inset-0">
          <ParticleBackground />
        </div>
        <Navbar />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                <About />
                <Projects />
                <Experience />
                <Leadership />
                <Blog />
                <Contact />
              </main>
            } />
            <Route path="/blog" element={<BlogsPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/interactive-balls" element={<InteractiveBallsGame />} />
            <Route path="/games/stack-game" element={<StackGame />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;