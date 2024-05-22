const carousel = document.querySelector('.carousel');
const ul = carousel.querySelector('ul');
const items = ul.children;
let currentItem = 0;

function animate() {
  ul.style.transform = `translateX(${currentItem * -100}px)`;
  currentItem++;
  if (currentItem >= items.length) {
    currentItem = 0;
  }
  requestAnimationFrame(animate);
}
animate();


let timer;
function animate() {
  timer = setTimeout(() => {
    ul.style.transform = `translateX(${currentItem * -100}px)`;
    currentItem++;
    if (currentItem >= items.length) {
      currentItem = 0;
    }
    animate();
  }, 4000); // adjust the timer interval to your liking
}

animate();