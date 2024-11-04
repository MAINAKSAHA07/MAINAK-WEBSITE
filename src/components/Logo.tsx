import React from 'react';

const Logo = () => {
  return (
    <div className="relative w-10 h-10">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full transform transition-transform hover:scale-110"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              className="text-slate-800 dark:text-slate-200"
              style={{ stopColor: 'currentColor' }}
            />
            <stop
              offset="100%"
              className="text-slate-600 dark:text-slate-400"
              style={{ stopColor: 'currentColor' }}
            />
          </linearGradient>
        </defs>
        <g className="animate-spin-slow origin-center">
          <path
            d="M50 10
              A40 40 0 1 0 90 50
              L70 50
              A20 20 0 1 1 50 30
              Z"
            fill="url(#logoGradient)"
            className="transform origin-center"
          />
          <circle
            cx="50"
            cy="50"
            r="5"
            className="fill-current text-slate-800 dark:text-slate-200"
          />
        </g>
      </svg>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-slate-800 dark:bg-slate-200 rounded-full animate-bounce-slow" />
    </div>
  );
};

export default Logo;