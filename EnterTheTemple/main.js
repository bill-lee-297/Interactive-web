let guardian1 = document.querySelector('.guardian.left.front');
let guardian2 = document.querySelector('.guardian.left.back');
let guardian3 = document.querySelector('.guardian.right.front');
let guardian4 = document.querySelector('.guardian.right.back');

let temple = document.querySelector('.temple');
let templeImg = document.querySelector('.temple img');
let templeHill = document.querySelector('.temple-hill');

window.addEventListener('scroll', () => {
  let scrollValue = window.scrollY;
  let templeOffset = temple.offsetTop;

  // 앞 줄 사대천왕
  guardian1.style.height = `${80 + scrollValue/80}vh`;
  guardian1.style.left = `-${10 + scrollValue/10}%`;
  guardian1.style.bottom = `-${scrollValue/15}%`;

  guardian3.style.height = `${80 + scrollValue/80}vh`;
  guardian3.style.right = `-${10 + scrollValue/10}%`;
  guardian3.style.bottom = `-${scrollValue/20}%`;

  // 뒷 줄 사대천왕
  guardian2.style.height = `${80 + scrollValue/80}vh`;
  guardian2.style.left = `-${scrollValue/20}%`;
  guardian2.style.bottom = `${20 - scrollValue/20}%`;

  guardian4.style.height = `${80 + scrollValue/80}vh`;
  guardian4.style.right = `-${scrollValue/20}%`;
  guardian4.style.bottom = `${20 - scrollValue/20}%`;

  console.log("scrollValue :: ", scrollValue);
  console.log("templeOffset :: ", templeOffset);
  console.log("templeHill.clientHeight :: ", templeHill.clientHeight);

  if(scrollValue * 2 >= templeOffset) {
    temple.classList.add('active');
  } else {
    temple.classList.remove('active');
  }
})
