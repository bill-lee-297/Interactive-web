import React, { useEffect, useRef, useState } from 'react';
import { type Wish } from '../../firebase/wishes';
import styles from './WishList.module.css';
import gsap from 'gsap';
import { subscribeToWishes } from '../../firebase/wishes';

const WishList = ({ showWishList }: {showWishList: boolean}) => {
  const wishRef = useRef<HTMLDivElement>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);

  useEffect(() => {
    if (!showWishList) return;

    const unsubscribe = subscribeToWishes((updatedWishes) => {
      setWishes(updatedWishes);
    });

    return () => {
      unsubscribe();
    };
  }, [showWishList]);

  useEffect(() => {
    if (wishes.length === 0) return;


    const showWish = () => {
      if (!wishRef.current) return;

      // 랜덤한 위치 계산 (화면의 20%~80% 범위 내)
      // x가 35 ~ 65이면서 y가 35 ~ 55 경우 다른 위치로 다시 계산
      let x = Math.random() * 60 + 20;
      let y = Math.random() * 40 + 20;
      while (x > 35 && x < 65 && y > 35 && y < 55) {
        x = Math.random() * 60 + 20;
        y = Math.random() * 40 + 20;
      }

      // 초기 상태 설정
      gsap.set(wishRef.current, {
        x: `${x}vw`,
        y: `${y}vh`,
        opacity: 0,
        scale: 0.8,
      });

      gsap.to(wishRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(wishRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: 1,
            ease: 'power2.in',
            onComplete: () => {
              setCurrentWishIndex((prev) => (prev + 1) % wishes.length);
            }
          });
        }
      });
    };

    showWish();
  }, [wishes, currentWishIndex]);

  // 컴포넌트가 언마운트될 때만 wishes를 초기화
  useEffect(() => {
    return () => {
      setWishes([]);
    };
  }, []);

  if (wishes.length === 0) return null;

  return (
    <div className={styles.wishListContainer}>
      <div ref={wishRef} className={styles.wishItem}>
        <p className={styles.wishContent}>
          {wishes[currentWishIndex].content}
        </p>
      </div>
    </div>
  );
};

export default WishList; 