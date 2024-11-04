import React from 'react';
import { Code2, Database, Cpu, Brain } from 'lucide-react';

const About = () => {
  const skills = [
    { category: "Programming", items: ["Python", "JavaScript", "C++", "MATLAB"] },
    { category: "Frameworks", items: ["React", "Node.js", "TensorFlow", "PyTorch"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Linux"] },
    { category: "Robotics", items: ["ROS", "Computer Vision", "Sensor Fusion", "Control Systems"] }
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

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-700">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <edu.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">{edu.degree}</h4>
                    <p className="text-slate-600">{edu.school}</p>
                    <p className="text-sm text-slate-500">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-700">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-700 mb-2">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-white text-sm text-slate-600 rounded-full shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;