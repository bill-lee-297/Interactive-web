// Matter.js 초기화
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

let engine, render, ground;
let balls = [];
let timeoutIds = [];

// Matter.js 엔진 및 렌더러 초기화
function initMatter() {
  if (!engine) {
    engine = Engine.create();
    render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'blanchedalmond',
      }
    });
    Render.run(render);
    Matter.Runner.run(engine);
  }
  createGround();
}

// 바닥 생성
function createGround() {
  if (ground) {
    World.remove(engine.world, ground);
  }
  ground = Bodies.rectangle(
    window.innerWidth / 2, // x 위치
    window.innerHeight / 1.5, // y 위치
    window.innerWidth / 2, // 너비
    20, // 높이
    { isStatic: true, render: { fillStyle: '#ff0000' } }
  );
  World.add(engine.world, ground);
}


// 공 생성
function createBall() {
  const radius = 20;
  const x = Math.random() * (window.innerWidth - radius * 2) + radius;
  const color = getRandomColor();
  const delay = Math.random() * 2; // 0~2초 랜덤 딜레이

  const timeoutId = setTimeout(() => {
    const ball = Bodies.circle(x, 10, radius, {
      restitution: 0.8, // 탄성 계수
      friction: 0.1, // 마찰 계수
      render: {
        fillStyle: color,
      }
    });
    Body.setVelocity(ball, { x: 0, y: 0 });
    balls.push(ball);
    World.add(engine.world, ball);
  }, delay * 1000);
  timeoutIds.push(timeoutId);
}

// 애니메이션 시작
function startAnimation() {
  clearBalls();
  initMatter();
  const count = Number(document.getElementById('count').value);
  const maxCount = Math.min(count, 1000);
  for (let i = 0; i < maxCount; i++) {
    createBall();
  }
}

// 공 제거
function clearBalls() {
  timeoutIds.forEach(id => clearTimeout(id));
  timeoutIds = [];
  if (balls.length > 0 && engine) {
    balls.forEach(ball => {
      World.remove(engine.world, ball);
    });
    balls = [];
  }
}

// 랜덤 색상 생성
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

// 창 크기 변경 대응
window.addEventListener('resize', () => {
  if (engine && render) {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight;
    createGround();
  }
});