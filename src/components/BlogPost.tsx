import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API
  const blog = {
    id: 1,
    title: "The Future of Robotics in Healthcare",
    content: `
      <p>The integration of robotics in healthcare is revolutionizing the way medical procedures are performed and how patient care is delivered. From surgical assistance to rehabilitation therapy, robots are becoming an integral part of modern healthcare systems.</p>

      <h2>Surgical Robotics</h2>
      <p>Robotic surgical systems have transformed the operating room, enabling surgeons to perform minimally invasive procedures with unprecedented precision. These systems provide enhanced visualization, greater range of motion, and improved accuracy compared to traditional surgical methods.</p>

      <h2>Patient Care Automation</h2>
      <p>Autonomous robots are being deployed in hospitals to assist with routine tasks such as medication delivery, patient monitoring, and sanitization. This automation helps reduce the workload on healthcare staff and minimizes the risk of human error.</p>

      <h2>Rehabilitation Robotics</h2>
      <p>Robotic devices are playing a crucial role in physical therapy and rehabilitation. These systems can provide consistent, repetitive movements and real-time feedback, helping patients recover more effectively from injuries or surgeries.</p>

      <h2>Future Prospects</h2>
      <p>As technology continues to advance, we can expect to see even more sophisticated robotic systems in healthcare. Artificial intelligence integration will enable these robots to make more autonomous decisions and provide more personalized care to patients.</p>
    `,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    author: "Mainak Saha",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Robotics"
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="px-4 py-2 bg-white/90 text-slate-800 text-sm font-medium rounded-full">
              {blog.category}
            </span>
            <h1 className="text-4xl font-bold text-white mt-4">{blog.title}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-6 mb-8 text-slate-600">
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

        <article 
          className="prose prose-slate prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="border-t border-slate-200 pt-8 mb-16">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">About the Author</h3>
          <div className="flex items-start space-x-4">
            <img
              src="https://i.ibb.co/zhjqH1f/Mainak-RESUME-PHOTO.png"
              alt="Author"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="font-medium text-slate-800">{blog.author}</h4>
              <p className="text-slate-600 mt-1">
                A robotics enthusiast and researcher specializing in healthcare automation and AI applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;