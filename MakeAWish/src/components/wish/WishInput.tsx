import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styles from './WishInput.module.css';
import gsap from 'gsap';
import ShootingStar from '../background/stars/ShootingStar';

const WishInput = () => {
  const wishTextRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const wishInputRef = useRef<HTMLInputElement>(null);
  const wishBtnRef = useRef<HTMLButtonElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [wish, setWish] = useState('');
  const [showWish, setShowWish] = useState(false);
  const [showShootingStar, setShowShootingStar] = useState(false);

  useLayoutEffect(() => {
    const inputTl = gsap.timeline();
    if (wishInputRef.current) {
      inputTl.fromTo(
        wishInputRef.current,
        { opacity: 0, y: 50, scale: 0.4 },
        { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power1.out' }
      );
    }
    if (wishBtnRef.current) {
      inputTl.fromTo(
        wishBtnRef.current,
        { opacity: 0, y: 50, scale: 0.4 },
        { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power1.out' },
        '-=1.5'
      );
    }
  }, []);

  useEffect(() => {
    if(!showWish) return;
    const showTl = gsap.timeline({
      delay: 3
    });
    

    if (wishTextRef.current) {
      showTl.fromTo(wishTextRef.current, 
        { opacity: 0, scale: 0.8, y: 100 }, 
        { opacity: 1, scale: 1, y: 0, duration: 2, ease: 'power1.out' }
      );
    }
    if (messageRef.current) {
      showTl.fromTo(messageRef.current, 
        { opacity: 0, y: 50, scale: 0.8 }, 
        { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power1.out' },
        "-=1"
      );
    }
    showTl.to(wishTextRef.current, {
      delay: 1,
      opacity: 0,
      duration: 1,
      ease: 'circ.out',
    })
    showTl.to(messageRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'circ.out',
    }, "<")
  }, [showWish]);

  const handleButtonClick = () => {
    if (wish.trim() === '') return;
    setShowWish(true);
    setShowShootingStar(true);
  };

  return (
    <div className={styles.wishCenter}>
      {showShootingStar && <ShootingStar isActive={showShootingStar} />}
      {!showWish && (
        <>
          <input
            ref={wishInputRef}
            type="text"
            placeholder={isFocused ? '' : '너의 소원을 알려줘'}
            className={styles.wishInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleButtonClick();
            }}
          />
          <button ref={wishBtnRef} className={styles.wishBtn} onClick={handleButtonClick}>
            보내기
          </button>
        </>
      )}
      {showWish && (
        <div className={styles.wishResultWrap}>
          <div ref={wishTextRef} className={styles.wishResult}>
            {wish}
          </div>
          <div ref={messageRef} className={styles.wishMessage}>
            너의 소원이 이루어질 거야!
          </div>
        </div>
      )}
    </div>
  );
};

export default WishInput;
