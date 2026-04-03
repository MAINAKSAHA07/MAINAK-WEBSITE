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
      <div className="min-h-screen flex items-center justify-center bg-transparent z-20 relative">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-[rgba(112,66,248,0.38)] border border-[#7042f88b] text-white rounded-lg hover:bg-[#b49bff]/20 transition-colors"
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
      className="min-h-screen bg-transparent relative z-20 py-20"
    >
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="card shadow-lg overflow-hidden border border-[#7042f88b]">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center text-gray-400 mb-6 font-medium">
              <span className="mr-4 flex items-center"><User className="w-4 h-4 mr-1" />{blog.author}</span>
              <span className="mr-4 flex items-center"><Calendar className="w-4 h-4 mr-1" />{blog.date}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{blog.readTime}</span>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: blog.content }} />
            
            {/* Interactive Features */}
            <div className="mt-8 pt-6 border-t border-[rgba(112,66,248,0.38)]">
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors border ${
                    isLiked
                      ? 'bg-[rgba(112,66,248,0.38)] text-[#b49bff] border-[#7042f88b]'
                      : 'bg-transparent text-gray-400 border-[rgba(112,66,248,0.38)] hover:bg-[rgba(112,66,248,0.2)]'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>{likes}</span>
                </button>

                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center space-x-2 px-4 py-2 bg-transparent border border-[rgba(112,66,248,0.38)] text-gray-400 rounded-lg hover:bg-[rgba(112,66,248,0.2)] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{comments.length}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors border ${
                    isBookmarked
                      ? 'bg-[rgba(112,66,248,0.38)] text-[#b49bff] border-[#7042f88b]'
                      : 'bg-transparent border-[rgba(112,66,248,0.38)] text-gray-400 hover:bg-[rgba(112,66,248,0.2)]'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-2 px-4 py-2 bg-transparent border border-[rgba(112,66,248,0.38)] text-gray-400 rounded-lg hover:bg-[rgba(112,66,248,0.2)] transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#030014] border border-[#7042f88b] rounded-lg shadow-[0_0_10px_#bf97ff3d] py-2 z-10">
                      {shareOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => handleShare(option.url)}
                          className="w-full px-4 py-2 text-left text-gray-300 hover:bg-[rgba(112,66,248,0.2)] transition-colors"
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
                  <h3 className="text-xl font-semibold text-white mb-4">Comments</h3>
                  <form onSubmit={handleAddComment} className="mb-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full px-4 py-2 bg-[rgba(3,0,20,0.8)] border border-[#7042f88b] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b49bff]"
                      rows={3}
                    />
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-[rgba(112,66,248,0.38)] border border-[#7042f88b] text-white rounded-lg hover:bg-[#b49bff]/20 transition-colors"
                    >
                      Post Comment
                    </button>
                  </form>

                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-[rgba(3,0,20,0.8)] border border-[rgba(112,66,248,0.38)] p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-white">{comment.author}</span>
                          <span className="text-sm text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
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