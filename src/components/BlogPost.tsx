import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, User, Calendar, ArrowLeft, Share2, Bookmark, ThumbsUp, MessageCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';
import { Blog, matchSlug } from '../utils/slugify';

interface ShareOption {
  name: string;
  url: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface BlogInteraction {
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isBookmarked: boolean;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [showComments, setShowComments] = useState<boolean>(false);

  const blog = blogs.find(blog => matchSlug(slug || '', blog.title));

  // Load interactions from localStorage
  useEffect(() => {
    if (blog) {
      const storedInteractions = localStorage.getItem(`blog_${blog.id}`);
      if (storedInteractions) {
        const interactions: BlogInteraction = JSON.parse(storedInteractions);
        setLikes(interactions.likes);
        setComments(interactions.comments);
        setIsLiked(interactions.isLiked);
        setIsBookmarked(interactions.isBookmarked);
      } else {
        // Initialize with default values if no stored data exists
        setLikes(blog.likes);
        setComments([
          {
            id: 1,
            author: 'John Doe',
            content: 'Great article! Very informative and well-written.',
            date: '2 days ago'
          },
          {
            id: 2,
            author: 'Jane Smith',
            content: 'I learned a lot from this. Thanks for sharing!',
            date: '1 day ago'
          }
        ]);
      }
    }
  }, [blog]);

  // Save interactions to localStorage whenever they change
  useEffect(() => {
    if (blog) {
      const interactions: BlogInteraction = {
        likes,
        comments,
        isLiked,
        isBookmarked
      };
      localStorage.setItem(`blog_${blog.id}`, JSON.stringify(interactions));
    }
  }, [blog, likes, comments, isLiked, isBookmarked]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Blog Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (url: string) => {
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(), // Use timestamp for unique ID
        author: 'You',
        content: newComment,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const shareOptions: ShareOption[] = [
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}` },
    { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}` },
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
    { name: 'Email', url: `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(window.location.href)}` }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-4xl mx-auto px-4">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-6">
              <span className="mr-4">By {blog.author}</span>
              <span className="mr-4">{blog.date}</span>
              <span>{blog.readTime}</span>
            </div>
            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
            
            {/* Interactive Features */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>{likes}</span>
                </button>

                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{comments.length}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10">
                      {shareOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => handleShare(option.url)}
                          className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Comments Section */}
              {showComments && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Comments</h3>
                  <form onSubmit={handleAddComment} className="mb-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Post Comment
                    </button>
                  </form>

                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{comment.author}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default BlogPost;