import React from 'react';
import GameCard from '../components/games/GameCard';

const games = [
  {
    title: 'Interactive Balls',
    description: 'Move your mouse around to interact with colorful balls that react to your cursor position.',
    image: '/assets/ball_light.png',
    path: '/games/interactive-balls'
  },
  {
    title: 'Stack Game',
    description: 'Click or press the spacebar to stack the blocks as high as you can!',
    image: '/assets/stack.png',
    path: '/games/stack-game'
  },
  // Add more games here as you create them
];

const Games: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Interactive Games</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore a collection of fun and interactive games. Each game offers a unique experience!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard
              key={game.path}
              title={game.title}
              description={game.description}
              image={game.image}
              path={game.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games; 