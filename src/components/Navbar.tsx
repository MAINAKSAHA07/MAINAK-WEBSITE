import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const sectionIds = ['about', 'projects', 'experience', 'leadership', 'blog', 'games', 'contact'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px 0px -60% 0px', // Trigger when section is 40% from top
      threshold: 0.2
    });
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'About', path: '/#about', id: 'about' },
    { name: 'Projects', path: '/#projects', id: 'projects' },
    { name: 'Experience', path: '/#experience', id: 'experience' },
    { name: 'Leadership', path: '/#leadership', id: 'leadership' },
    { name: 'Blogs', path: '/blog', id: 'blog' },
    { name: 'Games', path: '/games', id: 'games' },
    { name: 'Contact', path: '/#contact', id: 'contact' }
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
        navigate('/', { replace: true });
        const scrollToTarget = () => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            return true;
          }
          return false;
        };
        if (!scrollToTarget()) {
          const interval = setInterval(() => {
            if (scrollToTarget()) {
              clearInterval(interval);
            }
          }, 100);
          setTimeout(() => clearInterval(interval), 2000);
        }
      }
    }
  };

  return (
    <nav className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50">
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px] md:px-[40px]">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center group">
          <Logo />
          <span className="hidden md:flex font-bold ml-[10px] text-gray-300 text-xl tracking-tight group-hover:text-white transition-colors">
            Mainak Saha
          </span>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[600px] h-full flex-row items-center justify-between">
          <div className="flex items-center justify-between w-full h-auto border border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[20px] py-[10px] rounded-full text-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(link.path, e)}
                className={`cursor-pointer hover:text-[rgb(112,66,248)] transition ${activeSection === link.id ? 'text-[#b49bff] font-bold' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] border-b border-[rgba(112,66,248,0.38)] p-5 flex flex-col items-center text-gray-300 md:hidden z-50">
          <div className="flex flex-col items-center gap-4 w-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(link.path, e)}
                className={`w-full py-3 cursor-pointer hover:text-[rgb(112,66,248)] text-center transition border-b border-[rgba(112,66,248,0.1)] last:border-0 ${activeSection === link.id ? 'text-[#b49bff] font-bold' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;