window.addEventListener('DOMContentLoaded', function (unit) {
  let tl = gsap.timeline();

  tl.from('#page-1', { opacity: 0 });
  tl.from('.green_right', { y:30, opacity:0, duration:1 }, 0);
  tl.from('.green_left', { y:30, opacity:0, duration:1 }, '-=0.5');
  tl.from('.flower_left', { x:-50, y:-50, opacity:0 });
  tl.from('.flower_right', { x:50, y:50, opacity:0 }, "<");
  tl.from('.blue01', { y:30, opacity:0 }, "<");
  tl.from('.blue02', { y:30, opacity:0 }, "<");
  tl.from('.cat', { y:-30, duration:3, opacity:0 });

  tl.from('.bug', { x:50, y:50, duration:5, opacity:0 }, "-=2");
  tl.from('.cloud-small', { duration: 7, x:-830, opacity:0 }, "<");
  tl.from('.cloud-big', { duration: 7, x:530, opacity:0 }, "<");
  tl.from('.main_title .text', { y:-10, opacity:0, duration: 3 }, "<");
  tl.from('.main_title .explore', { y:-10, opacity:0, duration: 2 }, "-=6");


  tl.to('.bug', {y: 30, repeat: -1, yoyo: true, duration: 2}, "-=2");





})