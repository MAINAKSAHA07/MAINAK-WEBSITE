import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: "Backend Developer",
      company: "Supatrack (Full-Stack Fitness & Coaching Platform)",
      period: "Feb 2026 – Present",
      description: "Building scalable backend services for meal logging, progress tracking, and coach–client workflows on a fitness platform.",
      achievements: [
        "Solved fragmented user tracking and coaching workflows by building scalable FastAPI services integrating meal logging, real-time progress tracking, and PT–client interactions.",
        "Reduced manual effort and improved reliability by designing API pipelines integrating OpenAI, FatSecret, and external data sources for automated nutrition parsing.",
        "Enabled real-time engagement by implementing WebSocket-based notification and chat systems, improving responsiveness and retention.",
        "Supported end-to-end backend integration and deployment of iOS and Android apps backed by cloud infrastructure."
      ]
    },
    {
      role: "Graduate Research Assistant — Adidas Project",
      company: "Arizona State University",
      period: "May 2025 – Present",
      description: "Research-driven sports technology: mobile apps, sensors, and AI systems for real-time capture and analysis.",
      achievements: [
        "Led end-to-end development as a solo engineer on research systems—mobile apps and sensor-integrated platforms for real-time data capture and analysis.",
        "Developed real-time video analytics in Swift and OpenCV to detect and classify ball and human movement, optimizing accuracy and latency for mobile.",
        "Built dual-device sensor streaming (ESP32 + iOS) enabling 500Hz ingestion, visualization, and CSV logging with synchronized analytics and haptic feedback.",
        "Designed data pipelines for preprocessing, feature extraction, and visualization of multi-sensor signals for athletic performance insights.",
        "Deployed AI systems including an emotion detection and conversational platform using FastAPI, AWS EC2, PostgreSQL, and React with real-time inference and dashboards."
      ]
    },
    {
      role: "Software Engineer (Bash/Linux)",
      company: "AfterQuery Experts",
      period: "Jul 2025 – Nov 2025",
      description: "Remote role creating terminal-based tasks to train and evaluate LLMs on realistic Unix workflows.",
      achievements: [
        "Created complex terminal-based development tasks (via Terminal-Bench) used to train and evaluate large language models on Unix workflows, debugging, and infra repair.",
        "Worked with engineers to expand high-quality datasets that improve AI reliability, multi-step reasoning, and system-level problem solving."
      ]
    },
    {
      role: "Graduate Research Associate",
      company: "Arizona State University — TEAL Lab",
      period: "Aug 2025 – Oct 2025",
      description: "Touch Experience and Action Learning Lab: audio–vibration perception and interactive research tools.",
      achievements: [
        "Developed the Audio-Vibration Rating Explorer—an interactive platform analyzing how four vibration designs map to 1,000+ sounds across 4,000+ ratings.",
        "Designed and deployed real-time audio-to-vibration generation using ML for feature extraction, classification, and vibration mapping with synchronized playback and waveform visualization (WaveSurfer.js).",
        "Optimized deployment and scalability using AWS EC2 for hosting and model inference, ensuring low-latency interaction."
      ]
    },
    {
      role: "Full-Stack Developer",
      company: "The Language Network",
      period: "Aug 2021 – Dec 2022",
      description: "Mumbai, India — full-stack web platform, LMS, and growth through SEO and analytics.",
      achievements: [
        "Designed and developed a full-stack web platform and LMS using React.js, Node.js, and MongoDB with scalable user management and third-party integrations.",
        "Improved online visibility by 60% via SEO/SEM (SEMrush, Google Analytics), achieving first-page rankings for 10+ high-value keywords.",
        "Built analytics dashboards with Salesforce to track engagement and conversions, increasing site traffic by 50%."
      ]
    },
    {
      role: "Data Engineering Intern",
      company: "Looqup.AI",
      period: "Mar 2025 – Apr 2025",
      description: "Remote — revenue forecasting, Azure data workflows, and MLOps.",
      achievements: [
        "Built division-level revenue forecasting models using Holt–Winters and SARIMA, improving sales prediction accuracy for individual merchants.",
        "Led data preprocessing and feature engineering with Azure-based workflows, improving dataset quality for downstream models.",
        "Contributed to an end-to-end MLOps pipeline using Docker for model containerization and backend integration.",
        "Delivered more accurate monthly revenue forecasts to support data-driven leadership decisions."
      ]
    }
  ];

  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxIndex = experiences.length - 1;

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

  return (
    <section id="experience" className="section-padding bg-transparent text-white relative z-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16 tracking-tight">
          Professional Experience
        </h2>
        <div className="relative overflow-visible">
          <div className="flex items-center">
            <button
              onClick={prev}
              className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[rgba(3,0,20,0.8)] border border-[rgba(112,66,248,0.38)] text-white hover:bg-[#b49bff]/20 shadow-lg transition-colors"
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 no-x-overflow"
                >
                  {/* Show current experience on mobile, current + next on desktop */}
                  <motion.div
                    key={experiences[current].role + experiences[current].company}
                    initial={false}
                    whileHover={{ y: -5 }}
                    className="card card-hover-effect h-full min-h-[260px] p-3"
                  >
                    <div className="p-8 flex flex-col h-full">
                      <div className="flex items-center mb-6">
                        <Briefcase className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3" />
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                          {experiences[current].role}
                        </h3>
                      </div>
                      <div className="flex items-center text-gray-400 mb-2">
                        <span className="font-medium text-lg">{experiences[current].company}</span>
                      </div>
                      <div className="flex items-center text-gray-500 mb-6">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span className="text-base">{experiences[current].period}</span>
                      </div>
                      <p className="text-gray-300 mb-6 font-medium leading-relaxed text-lg">
                        {experiences[current].description}
                      </p>
                      <ul className="space-y-3 pl-2 flex-grow">
                        {experiences[current].achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                            <span className="text-gray-300 leading-relaxed text-base">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* Show next experience on desktop only */}
                  {current + 1 < experiences.length && (
                    <motion.div
                      key={experiences[current + 1].role + experiences[current + 1].company}
                      initial={false}
                      whileHover={{ y: -5 }}
                      className="card card-hover-effect h-full min-h-[260px] p-3 hidden md:block"
                    >
                      <div className="p-8 flex flex-col h-full">
                        <div className="flex items-center mb-6">
                          <Briefcase className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3" />
                          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            {experiences[current + 1].role}
                          </h3>
                        </div>
                        <div className="flex items-center text-gray-400 mb-2">
                          <span className="font-medium text-lg">{experiences[current + 1].company}</span>
                        </div>
                        <div className="flex items-center text-gray-500 mb-6">
                          <Calendar className="w-5 h-5 mr-2" />
                          <span className="text-base">{experiences[current + 1].period}</span>
                        </div>
                        <p className="text-gray-300 mb-6 font-medium leading-relaxed text-lg">
                          {experiences[current + 1].description}
                        </p>
                        <ul className="space-y-3 pl-2 flex-grow">
                          {experiences[current + 1].achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                              <span className="text-gray-300 leading-relaxed text-base">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Placeholder for last card on desktop */}
                  {current + 1 >= experiences.length && (
                    <div className="hidden md:block h-full min-h-[260px]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={next}
              className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[rgba(3,0,20,0.8)] border border-[rgba(112,66,248,0.38)] text-white hover:bg-[#b49bff]/20 shadow-lg transition-colors"
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
                  current === idx ? 'bg-blue-500 dark:bg-blue-400' : 'bg-[#2A0E61]'
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