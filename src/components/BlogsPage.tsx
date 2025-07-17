import React from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { Blog, createBlogUrl } from '../utils/slugify';

const BlogsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Blog Posts</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore the latest insights in robotics, AI, and technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((blog: Blog) => (
            <div 
              key={blog.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(createBlogUrl(blog.title))}
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white text-sm font-medium rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3 space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {blog.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blog.readTime}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="inline-flex items-center text-slate-800 dark:text-white font-medium hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;