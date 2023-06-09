//define canvas as 2d
const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);
//define canvas size
canvas.width = 1920;
canvas.height = 960;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const backgroundImageHeight = 432;

//double jump
var doubleJump = 0;

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
            height: 4,
          })
        );
        break;
    }
  });
});

//gravity
const gravity = 0.075;

//create players
const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: `./img/hero_knight/Idle.png`,
  frameRate: 11,
  animations: {
    Idle: {
      imageSrc: `./img/hero_knight/Idle.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    Run: {
      imageSrc: `./img/hero_knight/Run.png`,
      frameRate: 8,
      frameBuffer: 7,
    },
    Jump: {
      imageSrc: `./img/hero_knight/Jump.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    Fall: {
      imageSrc: `./img/hero_knight/Fall.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    IdleLeft: {
      imageSrc: `./img/hero_knight/IdleLeft.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    RunLeft: {
      imageSrc: `./img/hero_knight/RunLeft.png`,
      frameRate: 8,
      frameBuffer: 7,
    },
    JumpLeft: {
      imageSrc: `./img/hero_knight/JumpLeft.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    FallLeft: {
      imageSrc: `./img/hero_knight/FallLeft.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
  },
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
  imageSrc: "./img/background.png",
});

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
};

//start animation
function animate() {
  //animation loop
  requestAnimationFrame(animate);
  //canvas background
  // c.fillStyle = `white`;
  // c.fillRect(0, 0, canvas.width, canvas.height);

  //save
  c.save();
  //scale up background image
  c.scale(4, 4);
  c.translate(camera.position.x, camera.position.y);
  //put background in game
  background.update();
  //put collisions block in the game
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.update();
  // });
  // //put platform collisions block in the game
  // platformCollisionBlocks.forEach((block) => {
  //   block.update();
  // });
  player.checkForHorizontalCanvasCollision();
  //put player in game
  player.update();
  //restore

  // player movement
  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.switchSprite("Run");
    player.velocity.x = 1.5;
    player.lastDirection = "right";
    player.shouldPanCameraToLeft({ canvas, camera });
  } else if (keys.a.pressed) {
    player.switchSprite("RunLeft");
    player.velocity.x = -1.5;
    player.lastDirection = "left";
    player.shouldPanCameraToRight({ canvas, camera });
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === "right") {
      player.switchSprite("Idle");
    } else {
      player.switchSprite("IdleLeft");
    }
  }

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ camera, canvas });
    if (player.lastDirection === "right") {
      player.switchSprite("Jump");
    } else {
      player.switchSprite("JumpLeft");
    }
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ camera, canvas });
    if (player.lastDirection === "right") {
      player.switchSprite("Fall");
    } else {
      player.switchSprite("FallLeft");
    }
  }

  c.restore();
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
      doubleJump += 1;
      if (doubleJump >= 3) {
        break;
      }
      player.velocity.y = -3.1;
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
