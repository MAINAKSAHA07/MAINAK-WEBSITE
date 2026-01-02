import React, { useEffect, useRef } from 'react';

interface TargetCursorProps {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  parallaxOn?: boolean;
}

const TargetCursor: React.FC<TargetCursorProps> = ({
  spinDuration = 2,
  hideDefaultCursor = false,
  parallaxOn = true,
}) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    let mouseX = 0;
    let mouseY = 0;

    const moveHandler = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const targets = document.querySelectorAll<HTMLElement>('.cursor-target');

      let closestTarget: HTMLElement | null = null;
      let minDist = Infinity;

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - mouseX;
        const dy = centerY - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < minDist && dist < 150) {
          minDist = dist;
          closestTarget = el;
        }
      });

      let targetX = mouseX;
      let targetY = mouseY;

      if (parallaxOn && closestTarget) {
        const rect = closestTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        targetX = mouseX + (centerX - mouseX) * 0.2;
        targetY = mouseY + (centerY - mouseY) * 0.2;
      }

      cursorEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      if (closestTarget) {
        cursorEl.classList.add('cursor-active');
      } else {
        cursorEl.classList.remove('cursor-active');
      }
    };

    window.addEventListener('mousemove', moveHandler);

    cursorEl.style.setProperty('--tc-spin-duration', `${spinDuration}s`);

    if (hideDefaultCursor) {
      document.documentElement.classList.add('tc-hide-default-cursor');
    }

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      document.documentElement.classList.remove('tc-hide-default-cursor');
    };
  }, [spinDuration, hideDefaultCursor, parallaxOn]);

  return <div ref={cursorRef} className="target-cursor" aria-hidden="true" />;
};

export default TargetCursor;


