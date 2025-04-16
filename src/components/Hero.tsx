import React from 'react';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const sectionRef = useIntersectionObserver();

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-16 section-fade-in"
    >
      <ParticleBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <img
              src="https://i.ibb.co/zhjqH1f/Mainak-RESUME-PHOTO.png"
              alt="Mainak Malay Saha"
              className="w-48 h-48 rounded-full mx-auto shadow-lg object-cover ring-4 ring-white dark:ring-slate-700"
            />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Mainak Malay Saha
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Welcome to my personal website! I'm a Master's student in Robotics and Autonomous Systems at Arizona State University, with a strong foundation in programming, frameworks, and robotics technologies. Explore my skills and projects in robotics and AI, and feel free to Connect with me!
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a 
              href="https://github.com/mainaksaha07" 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mainaksaha08/" 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:msaha4@asu.edu" 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="flex justify-center space-x-4">
            <a
              href="/MAINAKSAHA_RESUME_Apr10.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FileDown className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
