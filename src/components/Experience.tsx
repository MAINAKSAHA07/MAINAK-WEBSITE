import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Experience = () => {
  const experiences = [
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

  const visibleExperiences = experiences.slice(current, current + cardsToShow);
  // If at the end, wrap around to show the first card(s)
  if (visibleExperiences.length < cardsToShow) {
    visibleExperiences.push(...experiences.slice(0, cardsToShow - visibleExperiences.length));
  }

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-16">Professional Experience</h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {visibleExperiences.map((exp, idx) => (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-md p-8 flex flex-col border border-slate-200 dark:border-slate-700 h-full min-h-[420px]"
                >
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mr-2">{exp.role}</h3>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400 mb-1">
                    <span className="font-medium">{exp.company}</span>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 font-medium">{exp.description}</p>
                  <ul className="space-y-2 pl-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg"
            aria-label="Previous Experience"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-lg"
            aria-label="Next Experience"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
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