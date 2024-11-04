import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      role: "Full-Stack Developer",
      company: "The Language Network",
      period: "2023",
      description: "Led development of scalable website and implemented SEO improvements",
      achievements: [
        "Increased website visibility by 60% through optimization",
        "Implemented responsive design principles",
        "Enhanced user engagement metrics",
        "Optimized SEM/SEO performance"
      ]
    },
    {
      role: "Marketing & Business Development Intern",
      company: "Ukiyo Stays",
      period: "2022",
      description: "Drove business growth through marketing initiatives and customer experience improvements",
      achievements: [
        "Increased client satisfaction by 15%",
        "Expanded brand awareness by 20%",
        "Developed marketing strategies",
        "Improved customer engagement"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">Professional Experience</h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="sticky top-20">
                    <h3 className="text-xl font-semibold text-slate-800">{exp.role}</h3>
                    <div className="flex items-center text-slate-600 mt-2">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {exp.company}
                    </div>
                    <div className="flex items-center text-slate-500 mt-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <p className="text-slate-600 mb-4">{exp.description}</p>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3"></span>
                        <span className="text-slate-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;