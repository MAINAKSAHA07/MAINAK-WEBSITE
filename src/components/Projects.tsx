import React from 'react';
import { ExternalLink, Github, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      "title": "Smart Wearable Safety Device for Women",
      "description": "Conceptualizing an IoT-enabled wearable device integrating GPS tracking, emergency alerts, and physiological monitoring to enhance women's security.",
      "image": "https://i.imghippo.com/files/Le6101SXQ.webp",
      "tags": ["IoT", "Embedded Systems", "AI", "Safety Tech"],
      "achievements": [
        "Designed a concept for real-time GPS tracking and emergency alerts",
        "Proposed physiological monitoring for stress detection",
        "Exploring electric shock deterrents for self-defense",
        "Developing a multi-tier emergency response mechanism"
      ],
      "status": "In Idea & Research Stage"
    },    
    {
      title: "Pololu 3pi + Robot",
      description: "Developed an autonomous line-following and maze-solving robot with 95% accuracy using embedded systems expertise.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      tags: ["Embedded Systems", "C++", "Robotics", "Control Systems"],
      achievements: [
        "Achieved 95% accuracy in line-following and maze-solving",
        "Optimized real-time response for better performance",
        "Implemented advanced control algorithms"
      ]
    },
    {
      title: "Fraud Detection in UPI Transactions",
      description: "Built a fusion classifier for fraud detection in UPI transactions, incorporating location-based insights to reduce false positives.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      tags: ["Machine Learning", "Python", "Data Analysis", "Security"],
      achievements: [
        "Reduced false positives by 25%",
        "Processed over 1M transactions",
        "Implemented real-time detection system"
      ]
    },
    /**{
      title: "Virtual Mouse",
      description: "Created a gesture-based control system using computer vision techniques for intuitive human-computer interaction.",
      image: "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=80",
      tags: ["Computer Vision", "Python", "OpenCV", "MediaPipe"],
      achievements: [
        "Improved interaction efficiency by 30%",
        "Real-time hand gesture recognition",
        "Cross-platform compatibility"
      ]
    }**/
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-16">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col"
            >
              <div className="relative h-56 overflow-hidden group flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white text-sm font-medium rounded-full">
                    {project.tags[0]}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="mb-4 flex-grow">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Key Achievements:</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 mr-2"></span>
                        <span className="line-clamp-1">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(1).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 mt-auto">
                  <a 
                    href="https://github.com/MAINAKSAHA07" 
                    className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5 mr-1" />
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
