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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <ParticleBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main className="relative z-10">
              <Hero />
              <About />
              <Projects />
              <Experience />
              <Leadership />
              <Blog />
              <Contact />
            </main>
          } />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;