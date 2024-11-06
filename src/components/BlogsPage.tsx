import React from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogsPage = () => {
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "The Future of Robotics in Healthcare",
      excerpt: "Exploring how autonomous robots are revolutionizing medical procedures and patient care...",
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

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Blog Posts</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore the latest insights in robotics, AI, and technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div 
              key={blog.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 text-slate-800 text-sm font-medium rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
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

                <h2 className="text-xl font-semibold text-slate-800 mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="inline-flex items-center text-slate-800 font-medium hover:text-slate-600 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;