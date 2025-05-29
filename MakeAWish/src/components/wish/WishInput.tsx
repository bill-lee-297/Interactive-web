import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styles from './WishInput.module.css';
import gsap from 'gsap';
import ShootingStar from '../background/stars/ShootingStar';
import { IoRefreshSharp } from 'react-icons/io5';
import { saveWish } from '../../firebase/wishes';
import WishList from './WishList';

const WishInput = () => {
  const wishTextRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const wishInputRef = useRef<HTMLInputElement>(null);
  const wishBtnRef = useRef<HTMLButtonElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const showWishListBtnRef = useRef<HTMLButtonElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [wish, setWish] = useState('');
  const [showWish, setShowWish] = useState(false);
  const [showShootingStar, setShowShootingStar] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showWishList, setShowWishList] = useState(false);

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
    showTl.to(buttonsRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power1.out',
      onStart: () => setShowButtons(true)
    });
  }, [showWish]);

  const handleButtonClick = async () => {
    if (wish.trim() === '') return;
    
    try {
      await saveWish(wish.trim());
      setShowWish(true);
      setShowShootingStar(true);
    } catch (error) {
      console.error('소원 저장 중 오류 발생:', error);
      alert('소원을 저장하는 중 오류가 발생했습니다.');
    }
  };

  const handleRestart = () => {
    setShowWish(false);
    setShowShootingStar(false);
    setShowButtons(false);
    setWish('');
    setShowWishList(false);
  };

  const handleViewOtherWishes = () => {
    if (showWishListBtnRef.current) {
      showWishListBtnRef.current.style.display = 'none';
    }
    setShowWishList(true);
  };

  useEffect(() => {
    console.log(showWishList);
    
  }, [showWishList])

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
      {showWish && !showButtons && (
        <div className={styles.wishResultWrap}>
          <div ref={wishTextRef} className={styles.wishResult}>
            {wish}
          </div>
          <div ref={messageRef} className={styles.wishMessage}>
            너의 소원이 이루어질 거야!
          </div>
        </div>
      )}

      {showWishList && (
        <WishList showWishList={showWishList} />
      )}

      <div ref={buttonsRef} className={styles.actionButtons} style={{ opacity: 0 }}>
        {showButtons && (
          <>
            <button className={styles.actionButton} onClick={handleRestart}>
              <IoRefreshSharp size={24} />
            </button>
            <button 
              ref={showWishListBtnRef}
              className={styles.actionButton}
              onClick={handleViewOtherWishes}
            >
              다른 사람의 소원 보기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WishInput;
