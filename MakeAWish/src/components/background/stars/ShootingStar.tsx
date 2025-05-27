import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ShootingStar.module.css';

interface ShootingStarProps {
  isActive: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const ShootingStar: React.FC<ShootingStarProps> = ({ isActive }) => {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!isActive) return;

    const startX = getRandom(75, 85); // 시작 x
    const startY = getRandom(15, 25); // 시작 y
    const endX = getRandom(20, 30); // 끝 x
    const endY = getRandom(50, 60); // 끝 y

    const duration = 2;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const startXPx = (startX / 100) * viewportWidth;
    const startYPx = (startY / 100) * viewportHeight;
    const endXPx = (endX / 100) * viewportWidth;
    const endYPx = (endY / 100) * viewportHeight;

    const dy = endYPx - startYPx;
    const dx = endXPx - startXPx;
    const angleRadians = Math.atan2(dy, dx)

    const angleDegrees = (angleRadians * 180 / Math.PI)+180;

    if (starRef.current) {
      gsap.fromTo(
        starRef.current,
        {
          left: `${startX}%`,
          top: `${startY}%`,
          opacity: 1,
          rotate: angleDegrees,
        },
        {
          left: `${endX}%`,
          top: `${endY}%`,
          opacity: 0,
          duration,
          ease: 'none',
        }
      );
    }
  }, [isActive]);

  return <div ref={starRef} className={styles.shootingStar} />;
};

export default ShootingStar;
