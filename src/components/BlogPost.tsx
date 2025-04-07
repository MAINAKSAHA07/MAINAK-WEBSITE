import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, User, Calendar, ArrowLeft, Share2, Bookmark, ThumbsUp, MessageCircle, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const blog = blogs.find(b => {
    const blogSlug = b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return blogSlug === slug;
  });

  if (!blog) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Blog Not Found</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center px-6 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  const shareOptions = [
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}` },
    { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}` },
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
    { name: 'Email', url: `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(window.location.href)}` }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-slate-900 pt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/blogs')}
          className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blogs
        </button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden mb-8"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-4 py-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white text-sm font-medium rounded-full">
                {blog.category}
              </span>
              {blog.tags.map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white text-sm font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{blog.title}</h1>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center space-x-6 mb-8 text-slate-600 dark:text-slate-400">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {blog.author}
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            {blog.date}
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            {blog.readTime}
          </div>
        </div>

        <div className="flex flex-wrap items-center space-x-4 mb-8">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              isLiked
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{blog.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
            <MessageCircle className="w-5 h-5" />
            <span>{blog.comments}</span>
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-2 z-10">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {option.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <motion.article
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose prose-slate dark:prose-invert prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-slate-200 dark:border-slate-700 pt-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">About the Author</h3>
          <div className="flex items-start space-x-4">
            <img
              src="https://i.ibb.co/zhjqH1f/Mainak-RESUME-PHOTO.png"
              alt="Author"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="font-medium text-slate-800 dark:text-white">{blog.author}</h4>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                A robotics enthusiast and researcher specializing in healthcare automation and AI applications. Currently pursuing a Master's degree in Robotics and Autonomous Systems at Arizona State University.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogPost;