import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '../utils/motion';
import { mainResumePdfHref } from '../constants/resumeUrls';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Hero = () => {
  const sectionRef = useIntersectionObserver();

  return (
    <section ref={sectionRef} id="home" className="relative flex flex-col h-screen w-full">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-center justify-center px-10 md:px-20 mt-32 w-full z-[20] h-full"
      >
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">
              AI Engineer & Fullstack Developer
            </h1>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-6 mt-6 text-5xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          >
            <span>
              Mainak{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                Malay Saha
              </span>
            </span>
          </motion.div>

          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-lg text-gray-400 my-5 max-w-[600px]"
          >
            Full-stack developer and AI engineer with an M.S. in Robotics and Autonomous Systems (AI) from Arizona State University. I build scalable web platforms, real-time video analytics, and AI-powered systems with React, FastAPI, AWS, and OpenCV—explore my work below or get in touch.
          </motion.p>

          <motion.div variants={slideInFromLeft(1)} className="flex gap-4 items-center">
            <a
              href={mainResumePdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 button-primary flex items-center text-center text-white cursor-pointer rounded-lg w-max"
            >
              <FileDown className="w-5 h-5 mr-2" />
              Download Resume
            </a>
            <div className="flex space-x-4">
              <a href="https://github.com/mainaksaha07" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/mainaksaha08/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:msaha4@asu.edu" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full h-full flex justify-center items-center mt-10 md:mt-0"
        >
          <div className="relative group w-[250px] h-[250px] md:w-[350px] md:h-[350px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <img
              src="/assets/Mainak-RESUME-PHOTO.webp"
              alt="Mainak Malay Saha"
              className="relative w-full h-full object-cover rounded-full border-4 border-[#030014] shadow-2xl"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
