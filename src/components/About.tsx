import React, { useState, useRef, useEffect } from 'react';
import { Code2, Database, Cpu, Brain, Cloud, Settings, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const skills = [
    { category: "Programming Languages", icon: Code2, items: ["Python", "JavaScript", "C++", "MATLAB"] },
    { category: "Frameworks & Libraries", icon: Brain, items: ["React", "Node.js", "TensorFlow", "PyTorch", "FastAPI"] },
    { category: "Data Science & ML", icon: Zap, items: ["Pandas", "Scikit-learn", "Keras", "OpenCV", "NLP"] },
    { category: "Cloud & DevOps", icon: Cloud, items: ["AWS", "Azure", "Docker", "Linux"] },
    { category: "Robotics & Embedded", icon: Cpu, items: ["ROS", "Computer Vision", "Sensor Fusion", "Control Systems"] },
    { category: "Databases", icon: Database, items: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"] },
    { category: "Tools", icon: Settings, items: ["Git", "Jupyter", "VS Code", "Streamlit"] }
  ];

  const education = [
    {
      degree: "M.S. in Robotics and Autonomous Systems (Artificial Intelligence)",
      school: "Arizona State University",
      period: "2024 - 2026 (Expected)",
      icon: Cpu
    },
    {
      degree: "B.E. in Computer Engineering",
      school: "Mumbai University",
      period: "Graduated May 2024",
      icon: Code2
    }
  ];

  // Carousel logic for skills (show 4 at a time in a 2x2 grid)
  const cardsToShow = 4;
  const [current, setCurrent] = useState(0);
  const maxIndex = Math.max(0, Math.ceil(skills.length / cardsToShow) - 1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 8000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current, maxIndex]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1));
  const next = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));

  // Get the current set of 4 skills
  const startIdx = current * cardsToShow;
  let visibleSkills = skills.slice(startIdx, startIdx + cardsToShow);
  if (visibleSkills.length < cardsToShow) {
    visibleSkills = visibleSkills.concat(skills.slice(0, cardsToShow - visibleSkills.length));
  }

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-16">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <edu.icon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-white">{edu.degree}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{edu.school}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Skills</h3>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="wait">
                  {visibleSkills.map((skillGroup, index) => (
                    <motion.div
                      key={skillGroup.category}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4 }}
                      className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl flex flex-col gap-2"
                    >
                      <div className="flex items-center mb-2">
                        <skillGroup.icon className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-slate-100 dark:text-slate-300 text-lg">{skillGroup.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-4 py-2 bg-slate-700/40 dark:bg-slate-700/40 text-base text-slate-100 dark:text-slate-300 rounded-2xl border border-slate-500/30 dark:border-slate-600/30 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {/* Carousel Controls */}
              {skills.length > cardsToShow && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg"
                    aria-label="Previous Skills"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg"
                    aria-label="Next Skills"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  {/* Dots */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goTo(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          current === idx ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                        aria-label={`Go to skills set ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;