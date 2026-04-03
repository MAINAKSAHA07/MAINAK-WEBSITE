import { Code2, Cpu } from 'lucide-react';
import { SiPython, SiJavascript, SiCplusplus, SiReact, SiNodedotjs, SiNextdotjs, SiTypescript, SiTensorflow, SiPytorch, SiFastapi, SiPandas, SiScikitlearn, SiKeras, SiOpencv, SiDocker, SiLinux, SiRos, SiGit, SiVercel, SiMongodb, SiSwift, SiPostgresql } from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';

// --- Old skills array and carousel logic (commented for reference) ---
/*
const skills = [
  { category: "Programming Languages", icon: Code2, items: ["Python", "JavaScript", "C++", "MATLAB"] },
  { category: "Frameworks & Libraries", icon: Brain, items: ["React", "Node.js", "TensorFlow", "PyTorch", "FastAPI"] },
  { category: "Data Science & ML", icon: Zap, items: ["Pandas", "Scikit-learn", "Keras", "OpenCV", "NLP"] },
  { category: "Cloud & DevOps", icon: Cloud, items: ["AWS", "Azure", "Docker", "Linux"] },
  { category: "Robotics & Embedded", icon: Cpu, items: ["ROS", "Computer Vision", "Sensor Fusion", "Control Systems"] },
  { category: "Databases", icon: Database, items: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"] },
  { category: "Tools", icon: Settings, items: ["Git", "Jupyter", "VS Code", "Streamlit"] }
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
*/
// --- End old skills logic ---

const skillIcons = [
  { name: 'Python', icon: SiPython },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'C++', icon: SiCplusplus },
  { name: 'Swift', icon: SiSwift },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'AWS', icon: FaAws },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'PyTorch', icon: SiPytorch },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'Pandas', icon: SiPandas },
  { name: 'Scikit-learn', icon: SiScikitlearn },
  { name: 'Keras', icon: SiKeras },
  { name: 'OpenCV', icon: SiOpencv },
  { name: 'Docker', icon: SiDocker },
  { name: 'Linux', icon: SiLinux },
  { name: 'ROS', icon: SiRos },
  { name: 'Git', icon: SiGit },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Vercel', icon: SiVercel },
];

const education = [
  {
    degree: "M.S. in Robotics and Autonomous Systems (Artificial Intelligence)",
    school: "Arizona State University, Tempe, AZ — GPA: 3.80",
    period: "Aug 2024 – Dec 2025",
    icon: Cpu
  },
  {
    degree: "B.E. in Computer Engineering",
    school: "Terna Engineering College, Mumbai University — GPA: 3.3",
    period: "Aug 2020 – Jun 2024",
    icon: Code2
  }
];

const About = () => {
  return (
    <section id="about" className="section-padding bg-transparent text-white relative z-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16 tracking-tight">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 no-x-overflow">
          <div className="md:w-1/2 min-w-0 z-20">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-300 tracking-tight">
              Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="p-3 bg-[#03001480] border border-[#7042f88b] rounded-xl shadow-[0_0_10px_#bf97ff3d]">
                    <edu.icon className="w-7 h-7 text-[#b49bff]" />
                  </div>
                  <div className="min-w-0 break-words">
                    <h4 className="font-semibold text-lg text-gray-200 mb-2 tracking-tight">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-400 text-lg mb-1">
                      {edu.school}
                    </p>
                    <p className="text-base text-gray-500">
                      {edu.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 min-w-0 overflow-x-auto z-20">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-300 tracking-tight">
              Skills
            </h3>
            {/* New skills grid with icons */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
              {skillIcons.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center bg-[#03001480] border border-[#7042f88b] rounded-xl p-4 shadow-[0_0_10px_#bf97ff3d] transition-transform duration-200 hover:-translate-y-2 hover:shadow-[0_0_20px_#bf97ff70] group cursor-pointer"
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-400 group-hover:text-[#b49bff] transition-colors duration-200" />
                  <span className="mt-2 text-xs md:text-sm text-gray-300 font-medium text-center select-none">
                    {name}
                  </span>
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