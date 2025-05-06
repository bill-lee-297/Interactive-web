const tl = gsap.timeline({
  defaults: {
    opacity: 0,
    duration: 0.5,
    ease: 'back',
  }
});

function init(){


tl.from('.stage', {autoAlpha: 0})
  .from('.stage h1', {x:-50,duration:0.3})
  .from('.stage h2', {x:50,duration:0.3})
  .from('.stage p', {y:50})
  .from('.stage button', {y:50}, "-=0.3")
  .from('.planet > img', {scale:0, stagger:0.1})

}

document.addEventListener('DOMContentLoaded', () => {
  init();
});