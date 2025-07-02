import React from 'react';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Declare the custom element for TypeScript/React
// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-hole': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const Hero = () => {
  const sectionRef = useIntersectionObserver();

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="min-h-screen flex items-center justify-center pt-16 section-fade-in relative overflow-hidden"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-indigo-400/5 animate-pulse"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-blue-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)]"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '5s' }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <img
              src="/assets/Mainak-RESUME-PHOTO.webp"
              alt="Mainak Malay Saha"
              className="w-48 h-48 md:w-56 md:h-56 rounded-full mx-auto shadow-2xl object-cover ring-4 ring-white dark:ring-slate-700 transition-transform duration-300 hover:scale-105 hero-bounce"
            />
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold gradient-text mb-4 tracking-tight leading-tight">
            Mainak Malay Saha
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Welcome to my personal website! I'm a Master's student in Robotics and Autonomous Systems in Artificial Intelligence at Arizona State University, with a strong foundation in programming, frameworks, and robotics technologies. Explore my skills and projects in robotics and AI, and feel free to connect with me!
          </p>
          
          <div className="flex justify-center space-x-8 mb-16">
            <a 
              href="https://github.com/mainaksaha07" 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="GitHub Profile"
            >
              <Github className="w-7 h-7" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mainaksaha08/" 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-7 h-7" />
            </a>
            <a 
              href="mailto:msaha4@asu.edu" 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Email Contact"
            >
              <Mail className="w-7 h-7" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/assets/MAINAKSAHA_RESUME_jun22.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <FileDown className="w-5 h-5 mr-2 transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
