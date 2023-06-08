//define canvas as 2d
const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);
//define canvas size
canvas.width = 1920;
canvas.height = 961;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
//put collisions block
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

const platformCollisionBlocks = [];
//put platform collisions
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    switch (symbol) {
      case 202:
        platformCollisionBlocks.push(
          new CollisionBlock({
            position: {
              x: 16 * x,
              y: 16 * y,
            },
          })
        );
        break;
    }
  });
});

//gravity
const gravity = 0.1;

//create players
const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionBlocks,
  imageSrc: `./img/hero_knight/Idle.png`,
  frameRate: 11,
});
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

//background
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png", //change
});

//start animation loop
function animate() {
  //animation loop
  requestAnimationFrame(animate);
  //canvas background
  c.fillStyle = `white`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  //scale up background image
  c.save();
  c.scale(4, 4);
  c.translate(0, -background.image.height + scaledCanvas.height);
  //put background in game
  background.update();
  //put collisions block in the game
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  //put platform collisions block in the game
  platformCollisionBlocks.forEach((block) => {
    block.update();
  });
  //restore

  player.update();
  c.restore();

  //put players in game

  // player movement
  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 1.5;
  } else if (keys.a.pressed) {
    player.velocity.x = -1.5;
  }
}

//start animation
animate();

//key presses
addEventListener(`keydown`, (e) => {
  switch (e.key) {
    case `d`:
      keys.d.pressed = true;
      break;

    case `a`:
      keys.a.pressed = true;
      break;

    case `w`:
      player.velocity.y = -3.7;
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
