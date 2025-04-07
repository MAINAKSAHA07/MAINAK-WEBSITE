import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, User, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogs } from '../data/blogs';

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlides = isMobile ? blogs.length - 1 : Math.ceil(blogs.length / 3) - 1;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
    }, 10000);

    return () => resetTimeout();
  }, [currentSlide, maxSlides]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? maxSlides : prev - 1));

  const visibleBlogs = isMobile
    ? [blogs[currentSlide]]
    : blogs.slice(currentSlide * 3, currentSlide * 3 + 3);

  return (
    <section id="blog" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-0">Latest Blog Posts</h2>
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-8"
            >
              {visibleBlogs.map((blog) => (
                <div key={blog.id} className={`${isMobile ? 'w-full' : 'w-1/3'} flex-shrink-0`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col"
                  >
                    <div className="relative h-56 overflow-hidden group flex-shrink-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white text-sm font-medium rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap items-center text-sm text-slate-500 dark:text-slate-400 mb-3 space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {blog.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {blog.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {blog.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 flex-grow">
                        {blog.excerpt}
                      </p>

                      <button
                        onClick={() => {
                          const blogSlug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          navigate(`/blog/${blogSlug}`);
                        }}
                        className="inline-flex items-center text-slate-800 dark:text-white font-medium hover:text-slate-600 dark:hover:text-slate-300 transition-colors mt-auto"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {blogs.length > (isMobile ? 1 : 3) && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-slate-800 dark:bg-white' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
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
