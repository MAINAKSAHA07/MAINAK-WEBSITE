import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import InteractiveBalls from '../../components/games/InteractiveBalls';

const InteractiveBallsGame: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#012] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <Link
          to="/games"
          className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Link>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Interactive Balls</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Move your mouse around to interact with the colorful balls. Watch them react to your cursor position!
          </p>
        </div>

        <div className="relative h-[600px] rounded-xl overflow-hidden">
          <InteractiveBalls />
        </div>
      </div>
    </div>
  );
};

export default InteractiveBallsGame; 