import React from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { Blog, createBlogUrl } from '../utils/slugify';

const BlogsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent relative z-20 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Posts</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore the latest insights in robotics, AI, and technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((blog: Blog) => (
            <div 
              key={blog.id}
              className="card flex flex-col cursor-pointer"
              onClick={() => navigate(createBlogUrl(blog.title))}
            >
              <div className="relative h-48 overflow-hidden group flex-shrink-0">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[rgba(3,0,20,0.8)] border border-[rgba(112,66,248,0.38)] text-white text-sm font-medium rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {blog.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blog.readTime}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
                  {blog.excerpt}
                </p>

                <div className="inline-flex items-center text-[#b49bff] font-medium transition-colors mt-auto pt-4 border-t border-[rgba(112,66,248,0.1)]">
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