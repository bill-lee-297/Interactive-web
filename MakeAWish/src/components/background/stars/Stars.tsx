import styles from './Stars.module.css';

const STAR_COUNT = 150;

const Stars = () => {
  const starsDot = Array.from({ length: STAR_COUNT }).map((_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 90; // 90% 높이면 별 그리기
    const size = Math.random() * 4 + 1;
    const opacity = Math.random() * 0.7 + 0.3;

    return (
      <div
        key={i}
        className={styles.starDot}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          opacity,
        }}
      />
    );
  });

  return <div className={styles.starsBg}>{starsDot}</div>;
};

export default Stars;
