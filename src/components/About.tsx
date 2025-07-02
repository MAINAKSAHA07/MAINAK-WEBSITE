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
    <section id="about" className="section-padding bg-white dark:bg-slate-900">
      <div className="container">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-slate-800 dark:text-white mb-16 tracking-tight">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="md:w-1/2 min-w-0">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-slate-700 dark:text-slate-300 tracking-tight">
              Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <edu.icon className="w-7 h-7 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div className="min-w-0 break-words">
                    <h4 className="font-semibold text-lg text-slate-800 dark:text-white mb-2 tracking-tight">
                      {edu.degree}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-1">
                      {edu.school}
                    </p>
                    <p className="text-base text-slate-500 dark:text-slate-500">
                      {edu.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 min-w-0 overflow-x-auto">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-slate-700 dark:text-slate-300 tracking-tight">
              Skills
            </h3>
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 min-w-[280px] md:min-w-0">
                <AnimatePresence mode="wait">
                  {visibleSkills.map((skillGroup, index) => (
                    <motion.div
                      key={skillGroup.category}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4 }}
                      className="card card-hover-effect p-3 flex flex-col gap-2 min-w-0 break-words"
                    >
                      <div className="flex items-center mb-2">
                        <skillGroup.icon className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-base tracking-tight min-w-0 break-words">
                          {skillGroup.category}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm font-medium min-w-0 break-words"
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
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg"
                    aria-label="Previous Skills"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg"
                    aria-label="Next Skills"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  {/* Dots */}
                  <div className="flex justify-center mt-8 space-x-3">
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