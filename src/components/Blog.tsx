import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, User, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogs } from '../data/blogs';
import { slugify } from '../utils/slugify';

const Blog: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sortedBlogs = blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const maxSlides = isMobile ? sortedBlogs.length - 1 : Math.ceil(sortedBlogs.length / 3) - 1;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoSliding) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
      }, 10000);
    }
    return () => resetTimeout();
  }, [currentSlide, maxSlides, isAutoSliding]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoSliding(false);
    resetTimeout();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
    setIsAutoSliding(false);
    resetTimeout();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? maxSlides : prev - 1));
    setIsAutoSliding(false);
    resetTimeout();
  };
  
  const visibleBlogs = isMobile
    ? [sortedBlogs[currentSlide]]
    : sortedBlogs.slice(currentSlide * 3, currentSlide * 3 + 3);

  return (
    <section id="blog" className="py-20 bg-transparent text-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16">
          <h2 className="text-3xl font-bold mb-4 sm:mb-0 text-white">Latest Blog Posts</h2>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center transition-colors text-gray-300 hover:text-white"
            aria-label="View all blog posts"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="relative overflow-visible pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 no-x-overflow p-4"
            >
              {visibleBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  whileHover={{ y: -5 }}
                  className="card flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-[rgba(3,0,20,0.8)] border border-[rgba(112,66,248,0.38)] text-white">
                        {blog.category}
                      </span>
                    </div>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm mb-3 space-x-4 text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {blog.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {blog.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-white">
                      {blog.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-gray-300 flex-grow">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[rgba(112,66,248,0.1)]">
                      <div className="flex items-center text-sm text-gray-400">
                        <User className="w-4 h-4 mr-1" />
                        {blog.author}
                      </div>
                      <button
                        onClick={() => navigate(`/blog/${slugify(blog.title)}`)}
                        className="inline-flex items-center transition-colors text-gray-400 hover:text-[#b49bff]"
                        aria-label={`Read more about ${blog.title}`}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {sortedBlogs.length > (isMobile ? 1 : 3) && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 lg:-left-2 top-[40%] -translate-y-1/2 p-2 rounded-full shadow-[0_0_10px_#bf97ff3d] transition-colors bg-[rgba(3,0,20,0.8)] border border-[rgba(112,66,248,0.38)] text-white hover:bg-[#b49bff]/20 z-10 lg:p-3"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 lg:-right-2 top-[40%] -translate-y-1/2 p-2 rounded-full shadow-[0_0_10px_#bf97ff3d] transition-colors bg-[rgba(3,0,20,0.8)] border border-[rgba(112,66,248,0.38)] text-white hover:bg-[#b49bff]/20 z-10 lg:p-3"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index 
                        ? 'bg-[#b49bff]'
                        : 'bg-[#2A0E61]'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
