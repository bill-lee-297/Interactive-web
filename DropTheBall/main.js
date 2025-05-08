function startAnimation() {
  const count = Number(document.getElementById('count').value);
  
  for(let i=0; i<count; i++) {
    const ballElement = createBall();
    dropBall(ballElement);
  }
}

function createBall() {
  const ballElement = document.createElement('div');
  const color = getRandomColor();

  ballElement.classList.add('ball');
  ballElement.style.top = -50 + 'px';
  ballElement.style.left = `${Math.random() * innerWidth}px`;
  ballElement.style.backgroundColor = color;
  ballElement.style.boxShadow = `0 1px 2px ${color}`;

  document.querySelector('.container').appendChild(ballElement);
  return ballElement;
}

function dropBall(ballElement) {
  const delay = Math.random() * 3;

  gsap.to(ballElement, {
    y: window.innerHeight+10,
    duration: 2,
    ease: 'bounce.out',
    delay: delay
  });
}

function clearBalls() {
  const balls = document.querySelectorAll(".ball");
  balls.forEach(ball => {
    gsap.to(ball, {
      opacity: 0,
      scale: 0,
      duration: 0.7,
      onComplete: () => ball.remove()
    });
  });
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}