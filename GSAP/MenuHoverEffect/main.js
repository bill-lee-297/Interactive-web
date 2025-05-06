const items = document.querySelectorAll('.item');

gsap.defaults({duration: 0.3})

items.forEach(item => {
  let menuEffect = gsap.timeline({paused: true})
  menuEffect.to(item.querySelector('.dash'), {opacity:1, x:-5, backgroundColor:'yellow'})
  menuEffect.to(item.querySelector('.text'), {x:5, color:'#fff'}, 0)

  item.addEventListener('mouseenter', () => {
    menuEffect.play();
  })
  item.addEventListener('mouseleave', () => {
    menuEffect.reverse();
  })
})