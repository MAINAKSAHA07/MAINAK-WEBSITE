import React, { useState, useEffect, useRef } from 'react';
import { Users, Trophy, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Leadership = () => {
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

  // Load Credly script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const achievements = [
    {
      title: "Entrepreneurship Cell Secretary",
      organization: "Terna Engineering College",
      description: "Led initiatives to foster entrepreneurship and innovation among students",
      icon: Users,
      highlights: [
        "Organized startup competitions and workshops",
        "Mentored student entrepreneurs",
        "Built partnerships with industry leaders",
        "Managed a team of 150+ volunteers"
      ]
    },
    {
      title: "McKinsey.org Forward Program",
      organization: "McKinsey & Company",
      description: "Completed the McKinsey.org Forward online learning program developing practical skills for success in the future of work",
      icon: Award,
      highlights: [
        "Applied the McKinsey approach to problem-solving",
        "Developed effective communication and influence skills",
        "Built adaptable and resilience mindsets and habits",
        "Planned and developed a foundational digital toolkit"
      ],
      badge: true
    },
    {
      title: "Key Accomplishments",
      organization: "Professional Achievements",
      description: "Notable achievements in leadership and project management across various initiatives",
      icon: Trophy,
      highlights: [
        "Scaled multiple student startups from ideation to implementation",
        "Organized competitions with 500+ participants",
        "Facilitated workshops and training sessions",
        "Led cross-functional teams to successful project completion"
      ]
    }
  ];

  const maxSlides = isMobile ? achievements.length - 1 : Math.ceil(achievements.length / 2) - 1;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
    }, 8000);

    return () => resetTimeout();
  }, [currentSlide, maxSlides]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? maxSlides : prev - 1));

  const visibleAchievements = isMobile
    ? [achievements[currentSlide]]
    : achievements.slice(currentSlide * 2, currentSlide * 2 + 2);

  // Fill with placeholders if fewer than 2 achievements on desktop
  const filledAchievements = isMobile
    ? visibleAchievements
    : [...visibleAchievements, ...Array(2 - visibleAchievements.length).fill(null)];

  return (
    <section id="leadership" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-16">Leadership & Achievements</h2>

        <div className="relative overflow-hidden">
          <div className="flex items-center">
            <button
              onClick={prevSlide}
              className="hidden lg:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-slate-700/90 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 shadow-lg transition-colors"
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
                  className="grid md:grid-cols-2 gap-8"
                >
                  {filledAchievements.map((achievement, index) =>
                    achievement ? (
                      achievement.badge ? (
                        <motion.a
                          key={index}
                          href="https://www.credly.com/badges/2a32c60c-5e92-42c8-9174-1ca4d5f4421e"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -5 }}
                          className="block bg-white dark:bg-slate-700 rounded-xl shadow-md p-8 transition-all duration-200 hover:shadow-lg cursor-pointer"
                        >
                          <div className="flex items-center mb-6">
                            <div className="p-3 bg-slate-100 dark:bg-slate-600 rounded-lg mr-4">
                              <achievement.icon className="w-6 h-6 text-slate-600 dark:text-slate-200" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{achievement.title}</h3>
                              <p className="text-slate-600 dark:text-slate-300">{achievement.organization}</p>
                            </div>
                          </div>

                          <p className="text-slate-600 dark:text-slate-300 mb-6">{achievement.description}</p>

                          <div className="mb-6 flex justify-center">
                            <div 
                              data-iframe-width="150" 
                              data-iframe-height="270" 
                              data-share-badge-id="2a32c60c-5e92-42c8-9174-1ca4d5f4421e" 
                              data-share-badge-host="https://www.credly.com"
                              className="credly-badge pointer-events-none"
                            ></div>
                          </div>

                          <ul className="space-y-3">
                            {achievement.highlights.map((highlight: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 mr-3"></span>
                                <span className="text-slate-600 dark:text-slate-300">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.a>
                      ) : (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                          className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-8 transition-transform duration-200"
                        >
                          <div className="flex items-center mb-6">
                            <div className="p-3 bg-slate-100 dark:bg-slate-600 rounded-lg mr-4">
                              <achievement.icon className="w-6 h-6 text-slate-600 dark:text-slate-200" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{achievement.title}</h3>
                              <p className="text-slate-600 dark:text-slate-300">{achievement.organization}</p>
                            </div>
                          </div>

                          <p className="text-slate-600 dark:text-slate-300 mb-6">{achievement.description}</p>

                          <ul className="space-y-3">
                            {achievement.highlights.map((highlight: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 mr-3"></span>
                                <span className="text-slate-600 dark:text-slate-300">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )
                    ) : (
                      <div key={index} className="invisible lg:block" />
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={nextSlide}
              className="hidden lg:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-slate-700/90 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 shadow-lg transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {achievements.length > (isMobile ? 1 : 2) && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-slate-800 dark:bg-white' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Leadership;