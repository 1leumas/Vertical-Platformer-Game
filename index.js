//define canvas as 2d
const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);

//gravity
const gravity = 0.09;
//fill screen
canvas.width = 1024;
canvas.height = 576;

const player = new Player({
  x: 0,
  y: 0,
});
const player2 = new Player({
  x: 300,
  y: 100,
});

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `white`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  player2.update();
}

animate();
