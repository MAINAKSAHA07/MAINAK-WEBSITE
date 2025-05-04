import React, { useEffect, useRef } from 'react';
import './InteractiveBalls.css';

const BALLSIZE = 42;
const IMPECTRADIUS = 210;

interface Ball {
  div: HTMLDivElement;
  shadow: HTMLDivElement;
  x: number;
  y: number;
}

const InteractiveBalls: React.FC = () => {
  const ballsRef = useRef<Ball[]>([]);
  const ballsDivRef = useRef<HTMLDivElement>(null);
  const shadowsDivRef = useRef<HTMLDivElement>(null);
  const baseLightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ballsDivRef.current || !shadowsDivRef.current || !baseLightRef.current || !containerRef.current) return;

    document.body.style.setProperty('--ball-size', `${BALLSIZE}px`);
    
    // Create balls
    for (let x = -7; x < 8; x = x + 2) {
      for (let y = -5; y < 6; y = y + 2) {
        createBall(x, y);
      }
    }

    // Mouse move event listener
    const handleMouseMove = (e: MouseEvent) => {
      if (!baseLightRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - (rect.left + rect.width / 2);
      const my = e.clientY - (rect.top + rect.height / 2);

      baseLightRef.current.style.transform = `translate(-50%, -50%) translate(${mx}px, ${my}px)`;

      ballsRef.current.forEach((ball) => {
        const dx = ball.x - mx;
        const dy = ball.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < IMPECTRADIUS) {
          const distFactor = (IMPECTRADIUS - Math.min(dist, IMPECTRADIUS)) / IMPECTRADIUS;
          const angle = Math.atan2(dy, dx);

          ball.div.style.setProperty('--dist-factor', distFactor.toString());
          ball.div.style.setProperty('--angle', angle.toString());

          ball.shadow.style.setProperty('--dist-factor', distFactor.toString());
          ball.shadow.style.setProperty('--angle', angle.toString());
        }
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      containerRef.current && containerRef.current.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createBall = (x: number, y: number) => {
    if (!ballsDivRef.current || !shadowsDivRef.current) return;

    const ball = {
      div: document.createElement('div'),
      shadow: document.createElement('div'),
      x: x * BALLSIZE,
      y: y * BALLSIZE,
    };

    ball.div.classList.add('ball');
    ball.div.style.left = `${ball.x - BALLSIZE / 2}px`;
    ball.div.style.top = `${ball.y - BALLSIZE / 2}px`;
    ball.div.style.setProperty('--hue', ((x + y) * 3).toString());

    ball.shadow.classList.add('shadow');
    ball.shadow.style.left = `${ball.x}px`;
    ball.shadow.style.top = `${ball.y - BALLSIZE / 2}px`;

    ballsDivRef.current.appendChild(ball.div);
    shadowsDivRef.current.appendChild(ball.shadow);

    ballsRef.current.push(ball);
  };

  return (
    <div className="game-container" ref={containerRef}>
      <div className="baseLight" ref={baseLightRef}></div>
      <div className="shadows" ref={shadowsDivRef}></div>
      <div className="balls" ref={ballsDivRef}></div>
    </div>
  );
};

export default InteractiveBalls; 