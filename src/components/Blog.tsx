import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "The Future of Robotics in Healthcare",
      excerpt: "Exploring how autonomous robots are revolutionizing medical procedures and patient...",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      author: "Mainak Saha",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Robotics"
    },
    {
      id: 2,
      title: "Machine Learning in Financial Markets",
      excerpt: "How AI is transforming trading strategies and risk management in modern finance...",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      author: "Mainak Saha",
      date: "March 10, 2024",
      readTime: "4 min read",
      category: "AI"
    },
    {
      id: 3,
      title: "The Rise of Computer Vision",
      excerpt: "Analyzing the impact of computer vision technologies in everyday applications...",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80",
      author: "Mainak Saha",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Technology"
    },
    {
      id: 4,
      title: "Deep Learning Breakthroughs",
      excerpt: "Recent advances in neural networks and their practical applications...",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      author: "Mainak Saha",
      date: "March 1, 2024",
      readTime: "7 min read",
      category: "AI"
    },
    {
      id: 5,
      title: "The Evolution of Autonomous Systems",
      excerpt: "How self-driving technology is reshaping transportation and logistics...",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=1200&q=80",
      author: "Mainak Saha",
      date: "February 28, 2024",
      readTime: "5 min read",
      category: "Robotics"
    }
  ];

  const maxSlides = blogs.length - 3; // Updated for showing 3 cards

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
    }, 15000);

    return () => resetTimeout();
  }, [currentSlide, maxSlides]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? maxSlides : prev - 1));

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800">Latest Blog Posts</h2>
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
          >
            {blogs.map((blog) => (
              <div key={blog.id} className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-56 overflow-hidden group"> 
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 text-slate-800 text-sm font-medium rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 h-48"> {/* Reduced height for content */}
                    <div className="flex items-center text-sm text-slate-500 mb-3 space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {blog.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {blog.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 mb-4 overflow-hidden text-ellipsis">{blog.excerpt}</p>

                    <button
                      onClick={() => navigate(`/blog/${blog.id}`)}
                      className="inline-flex items-center text-slate-800 font-medium hover:text-slate-600 transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-slate-800 hover:bg-white transition-colors shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-slate-800 hover:bg-white transition-colors shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {Array.from({ length: maxSlides + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? 'bg-slate-800' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
