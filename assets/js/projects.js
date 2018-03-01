
const screenWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

const screenHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;


if (screenWidth > screenHeight) {
  document.body.classList.add('page--wider');
} else {
  document.body.classList.add('page--taller');
}

// eslint-disable-next-line
console.log('Want to see more? Looking for code?');
// eslint-disable-next-line
console.log('https://owenmcateer.github.io/Motus-Art');
