import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Leadership', path: '/#leadership' },
    { name: 'Blogs', path: '/blog' },
    { name: 'Games', path: '/games' },
    { name: 'Contact', path: '/#contact' }
  ];

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      e.preventDefault();
      const targetId = path.substring(2);
      
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home page first
        navigate('/', { replace: true });
        
        // Wait for the home page to load and then scroll to the target section
        const scrollToTarget = () => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            return true;
          }
          return false;
        };

        // Try to scroll immediately
        if (!scrollToTarget()) {
          // If the element isn't found yet, try again after a short delay
          const interval = setInterval(() => {
            if (scrollToTarget()) {
              clearInterval(interval);
            }
          }, 100);

          // Clear the interval after 2 seconds to prevent infinite checking
          setTimeout(() => {
            clearInterval(interval);
          }, 2000);
        }
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 shadow-md border-b border-slate-200 dark:border-slate-700
      ${isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md' : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur'}
    `} style={{ minHeight: '72px' }}>
      <div className="container py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <Logo />
          <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 group-hover:opacity-80 transition-opacity tracking-tight">
            MS
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleNavClick(link.path, e)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 transform hover:scale-105 font-medium text-base"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 transform hover:rotate-180"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-slate-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
          <a
            href="/assets/MAINAKSAHA_RESUME_jun22.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Resume
          </a>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 transform hover:rotate-180"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-slate-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-600 dark:text-slate-300 transition-transform duration-300 transform hover:scale-110 p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white dark:bg-slate-800 shadow-lg">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(link.path, e)}
                className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all duration-300 animate-slide-right font-medium text-base"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="/MAINAKSAHA_RESUME_Apr10.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all duration-300 animate-slide-right font-medium text-base"
              style={{ animationDelay: `${navLinks.length * 100}ms` }}
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;