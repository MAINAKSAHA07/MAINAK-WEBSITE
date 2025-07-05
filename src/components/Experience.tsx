import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: "Graduate Research Assistant",
      company: "ASU Center for Engagement Science – Adidas, ASU",
      period: "May 25 – Present",
      description: "Collaborating on multidisciplinary research focused on motion analysis and real-time feedback for athletic performance enhancement.",
      achievements: [
        "Collaborating with Dr. Aurel Coza on a multidisciplinary research project focused on motion analysis and real-time feedback for athletic performance.",
        "Developing an iOS application using Swift that integrates OpenCV for real-time video processing and motion detection.",
        "Designing and implementing algorithms to analyze human movement patterns and provide actionable feedback for enhanced physical training outcomes.",
        "Working closely with UI/UX and data science teams to ensure usability, performance, and data accuracy."
      ]
    },
    {
      role: "Data Engineering Intern",
      company: "Looqup.AI, Boston, USA",
      period: "Mar 25 – Apr 25",
      description: "Developed advanced revenue forecasting models and contributed to MLOps pipeline development for merchant sales data.",
      achievements: [
        "Developed division-specific revenue forecasting models using Holt's Winter and SARIMA, improving sales prediction accuracy for individual merchants.",
        "Spearheaded data preprocessing and feature engineering using Azure tools, enhancing dataset quality for superior model accuracy.",
        "Contributed to building an end-to-end MLOps pipeline and gained hands-on experience with Docker for model containerization and backend integration.",
        "Enabled more accurate monthly revenue forecasts, empowering leadership to make data-driven, strategic business decisions."
      ]
    },
    {
      role: "Full-Stack Developer",
      company: "The Language Network",
      period: "Aug 2021 - Dec 2021",
      description: "Led development of scalable website and implemented SEO improvements",
      achievements: [
        "Developed the website for The Language Network from the bottom up, overseeing the development of the front-end (HTML, CSS, JavaScript, React JS) and back-end (Node.js, MongoDB) components.",
        "Collaborated with cross-functional teams, leading to a scalable, user-friendly solution integrated with 5+ third-party services and ensuring optimal performance.",
        "Utilized SEMrush and SEO strategies, resulting in a 60% increase in search engine visibility and a significant improvement in keyword rankings, with 10+ keywords reaching the first page",
        "Succeeded in having a 50% increase in website traffic and user engagement, aided in the firm's overall growth."
      ]
    },
    {
      role: "Marketing & Business Development Intern",
      company: "Ukiyo Stays",
      period: "Jan 2023 - May 2023",
      description: "Drove business growth through marketing initiatives and customer experience improvements",
      achievements: [
        "Increased client satisfaction by 15%",
        "Expanded brand awareness by 20%",
        "Developed marketing strategies",
        "Improved customer engagement"
      ]
    }
  ];

  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardsToShow = 2;
  const maxIndex = Math.max(0, experiences.length - cardsToShow);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 10000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current, maxIndex]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1));
  const next = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));

  let visibleExperiences = experiences.slice(current, current + cardsToShow);
  // If at the end, wrap around to show the first card(s)
  if (visibleExperiences.length < cardsToShow) {
    visibleExperiences = visibleExperiences.concat(Array(cardsToShow - visibleExperiences.length).fill(null));
  }

  return (
    <section id="experience" className="section-padding bg-white dark:bg-slate-900">
      <div className="container">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-slate-800 dark:text-white mb-16 tracking-tight">
          Professional Experience
        </h2>
        <div className="relative overflow-visible">
          <div className="flex items-center">
            <button
              onClick={prev}
              className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 shadow-lg transition-colors"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              aria-label="Previous Experience"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {visibleExperiences.map((exp, idx) =>
                    exp ? (
                      <motion.div
                        key={exp.role + exp.company}
                        initial={false}
                        whileHover={{ y: -5 }}
                        className="card card-hover-effect h-full min-h-[260px] p-3"
                      >
                        <div className="p-8 flex flex-col h-full">
                          <div className="flex items-center mb-6">
                            <Briefcase className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3" />
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                              {exp.role}
                            </h3>
                          </div>
                          <div className="flex items-center text-slate-600 dark:text-slate-400 mb-2">
                            <span className="font-medium text-lg">{exp.company}</span>
                          </div>
                          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-6">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span className="text-base">{exp.period}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 mb-6 font-medium leading-relaxed text-lg">
                            {exp.description}
                          </p>
                          <ul className="space-y-3 pl-2 flex-grow">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                                <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : (
                      <div key={idx} className="invisible md:block h-full min-h-[260px]" />
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={next}
              className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 shadow-lg transition-colors"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              aria-label="Next Experience"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: experiences.length }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  current === idx ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'
                }`}
                aria-label={`Go to experience ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;