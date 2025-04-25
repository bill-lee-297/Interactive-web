let guardian1 = document.querySelector('.guardian.left.front');
let guardian2 = document.querySelector('.guardian.left.back');
let guardian3 = document.querySelector('.guardian.right.front');
let guardian4 = document.querySelector('.guardian.right.back');

let temple = document.querySelector('.temple');
let templeImg = document.querySelector('.temple img');

window.addEventListener('scroll', () => {
  let scrollValue = window.scrollY;
  let templeOffset = temple.offsetTop;

  // 앞 줄 사대천왕
  guardian1.style.height = `${80 + scrollValue/80}vh`;
  guardian1.style.left = `-${scrollValue/10}%`;
  guardian1.style.bottom = `-${scrollValue/10}%`;

  guardian3.style.height = `${80 + scrollValue/80}vh`;
  guardian3.style.right = `-${scrollValue/10}%`;
  guardian3.style.bottom = `-${scrollValue/10}%`;

  // 뒷 줄 사대천왕
  guardian2.style.height = `${80 + scrollValue/80}vh`;
  guardian2.style.left = `${10-scrollValue/15}%`;
  guardian2.style.bottom = `${15 - scrollValue/15}%`;

  guardian4.style.height = `${80 + scrollValue/80}vh`;
  guardian4.style.right = `${10-scrollValue/15}%`;
  guardian4.style.bottom = `${15 - scrollValue/15}%`;

  let templeOpacity = Math.min(1, (1 - ((window.innerHeight - scrollValue) / 1000)));
  templeImg.style.opacity = `${templeOpacity.toFixed(2)}`;
  templeImg.style.scale = `${templeOpacity}`;
})
