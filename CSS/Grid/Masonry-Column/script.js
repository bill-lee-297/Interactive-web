const grid = document.querySelector('.grid');

const imageCount = 50;
const images = [];

const urls = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
];

for (let i = 0; i < imageCount; i++) {
    const url = urls[i % urls.length] + `?w=300&h=${400*(i%6)}&fit=crop`;
    images.push(url);
}


for(let i = 0; i < imageCount; i++) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('gid-item');

  const img = document.createElement('img');
  img.classList.add('image', `item-${i}`);
  img.src = images[i];
  img.alt = 'Random Image';
  img.style.width = '100%';
  img.style.display = 'block';
  wrapper.appendChild(img);

  grid.appendChild(wrapper);
}