import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
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
    {
      title: "Virtual Mouse",
      description: "Created a gesture-based control system using computer vision techniques for intuitive human-computer interaction.",
      image: "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=80",
      tags: ["Computer Vision", "Python", "OpenCV", "MediaPipe"],
      achievements: [
        "Improved interaction efficiency by 30%",
        "Real-time hand gesture recognition",
        "Cross-platform compatibility"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 text-sm text-slate-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a href="#" className="inline-flex items-center text-slate-600 hover:text-slate-900">
                    <Github className="w-5 h-5 mr-1" />
                    Code
                  </a>
                  <a href="#" className="inline-flex items-center text-slate-600 hover:text-slate-900">
                    <ExternalLink className="w-5 h-5 mr-1" />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;