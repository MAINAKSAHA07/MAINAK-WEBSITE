import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      "title": "Automated Warehouse Scenario",
      "description": "A sophisticated Answer Set Programming (ASP) based simulation of an automated warehouse environment, optimizing robot movements and task completion.",
      "image": "/assets/warehouse.png",
      "tags": ["Answer Set Programming", "Python", "Robotics", "Optimization"],
      "achievements": [
        "Implemented multi-robot coordination system",
        "Developed shelf handling and product delivery optimization",
        "Created path tracking and logging system",
        "Built multiple test instances for simulation"
      ],
      "githubLink": "https://github.com/MAINAKSAHA07/Automated-Warehouse_Scenario"
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
    {
      title: "iOS SDK for Scosche Rhythm Series Sensors",
      description: "Developed an iOS SDK and Demo app for integrating Scosche Rhythm series sensors and detailed fitness data into iOS applications.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      tags: ["iOS", "Swift", "Bluetooth", "Health Tech"],
      achievements: [
        "Implemented BLE communication with Scosche sensors",
        "Developed comprehensive data collection system",
        "Created user-friendly demo application",
        "Added support for heart rate variability (HRV) monitoring"
      ],
      githubLink: "https://github.com/MAINAKSAHA07/Wearable-band"
    },
    {
      title: "Recruiter Outreach Automation Bot",
      description: "An automated system for scraping recruiter information, finding valid emails, and sending personalized outreach emails with features like captcha handling and rate limiting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: ["Python", "Selenium", "MongoDB", "FastAPI"],
      achievements: [
        "Implemented LinkedIn profile scraping with anti-bot measures",
        "Developed email validation and discovery system",
        "Created automated email sending with personalization",
        "Built monitoring dashboard with Streamlit"
      ],
      githubLink: "https://github.com/MAINAKSAHA07/Email_automation_linkedin"
    },
    {
      title: "Emotion Detection System",
      description: "A machine learning project that analyzes physiological signals (EDA, EMG, ACC) to detect and classify emotions, particularly focusing on distinguishing between fear and excitement.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      tags: ["Machine Learning", "Python", "TensorFlow", "Data Analysis"],
      achievements: [
        "Implemented signal processing and feature extraction",
        "Developed multiple model architectures (Random Forest, SVM, LSTM)",
        "Created real-time prediction system",
        "Achieved high accuracy in emotion classification"
      ],
      githubLink: "https://github.com/MAINAKSAHA07/MLA_Project"
    },
    {
      title: "Ball Tracking with Live Trajectory Visualization",
      description: "Real-time ball tracking system with live trajectory visualization using OpenCV and Matplotlib. Features physics-based prediction, performance optimization with blitting, and advanced visualization with Rerun SDK.",
      image: "/assets/balltracking.png",
      tags: ["Computer Vision", "Python", "OpenCV", "Physics"],
      achievements: [
        "Implemented real-time ball tracking with OpenCV computer vision",
        "Developed live trajectory visualization with Matplotlib blitting",
        "Created physics-based prediction using polynomial fitting",
        "Built advanced 3D visualization with Rerun SDK"
      ],
      githubLink: "https://github.com/MAINAKSAHA07/Balltracking_pathploting"
    }
  ];

  const maxSlides = isMobile ? projects.length - 1 : Math.ceil(projects.length / 3) - 1;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
    }, 10000);

    return () => resetTimeout();
  }, [currentSlide, maxSlides]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? maxSlides : prev - 1));

  const visibleProjects = isMobile
    ? [projects[currentSlide]]
    : projects.slice(currentSlide * 3, currentSlide * 3 + 3);

  // Fill with placeholders if fewer than 3 projects on desktop
  const filledProjects = isMobile
    ? visibleProjects
    : [...visibleProjects, ...Array(3 - visibleProjects.length).fill(null)];

  return (
    <section id="projects" className="section-padding bg-white dark:bg-slate-900">
      <div className="container">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-slate-800 dark:text-white mb-16 tracking-tight">
          Featured Projects
        </h2>
        
        <div className="relative overflow-visible">
          <div className="flex items-center">
            <button
              onClick={prevSlide}
              className="hidden lg:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 shadow-lg transition-colors"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {filledProjects.map((project, index) =>
                    project ? (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="card card-hover-effect h-full min-h-[340px] flex flex-col p-3"
                      >
                        <div className="relative h-64 overflow-hidden group flex-shrink-0">
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
                          <h3 className="text-base md:text-lg font-semibold text-slate-800 dark:text-white mb-2 tracking-tight">
                            {project.title}
                          </h3>
                          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>

                          <div className="mb-4 flex-grow">
                            <h4 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Key Achievements:</h4>
                            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                              {project.achievements.map((achievement: string, i: number) => (
                                <li key={i} className="flex items-start">
                                  <span className="inline-block w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  <span className="line-clamp-1 leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.tags.slice(1).map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex space-x-4 mt-auto">
                            <a 
                              href={project.githubLink || "https://github.com/MAINAKSAHA07"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                            >
                              <Github className="w-5 h-5 mr-2" />
                              Code
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div key={index} className="invisible lg:block h-full min-h-[340px]" />
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={nextSlide}
              className="hidden lg:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 shadow-lg transition-colors"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          {projects.length > 3 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-slate-800 dark:bg-white' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;