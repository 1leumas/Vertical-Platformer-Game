//define canvas as 2d
const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);

//gravity
const gravity = 0.09;
//fill screen
canvas.width = 1024;
canvas.height = 576;

//create players
const player = new Player({
  x: 0,
  y: 0,
});
const player2 = new Player({
  x: 300,
  y: 100,
});
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

//start animation loop
function animate() {
  //animation loop
  requestAnimationFrame(animate);
  //background
  c.fillStyle = `white`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  //put players in game
  player.update();
  player2.update();

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 1.7;
  } else if (keys.a.pressed) {
    player.velocity.x = -1.7;
  }
}

animate();

addEventListener(`keydown`, (e) => {
  switch (e.key) {
    case `d`:
      keys.d.pressed = true;
      break;

    case `a`:
      keys.a.pressed = true;
      break;

    case `w`:
      player.velocity.y = -5;
      break;
  }
});

addEventListener(`keyup`, (e) => {
  switch (e.key) {
    case `d`:
      keys.d.pressed = false;
      break;

    case `a`:
      keys.a.pressed = false;
      break;
  }
});
