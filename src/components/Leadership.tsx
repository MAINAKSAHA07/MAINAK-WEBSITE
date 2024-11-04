import React from 'react';
import { Users, Trophy, Target } from 'lucide-react';

const Leadership = () => {
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
        "Managed a team of 20+ volunteers"
      ]
    }
  ];

  return (
    <section id="leadership" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">Leadership & Achievements</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-slate-100 rounded-lg mr-4">
                  <achievement.icon className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{achievement.title}</h3>
                  <p className="text-slate-600">{achievement.organization}</p>
                </div>
              </div>

              <p className="text-slate-600 mb-6">{achievement.description}</p>

              <ul className="space-y-3">
                {achievement.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-slate-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-slate-100 rounded-lg mr-4">
                <Trophy className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Key Accomplishments</h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start">
                <Target className="w-5 h-5 text-slate-400 mr-3 mt-1" />
                <span className="text-slate-600">Scaled multiple student startups from ideation to implementation</span>
              </li>
              <li className="flex items-start">
                <Target className="w-5 h-5 text-slate-400 mr-3 mt-1" />
                <span className="text-slate-600">Organized competitions with 500+ participants</span>
              </li>
              <li className="flex items-start">
                <Target className="w-5 h-5 text-slate-400 mr-3 mt-1" />
                <span className="text-slate-600">Facilitated workshops and training sessions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;