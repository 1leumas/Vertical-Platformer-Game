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
    x: 60,
    y: 300,
  },
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: `./img/hero_knight/Idle.png`,
  frameRate: 11,
  animations: {
    //Movement animations
    Idle: {
      imageSrc: `./img/hero_knight/Idle.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    IdleLeft: {
      imageSrc: `./img/hero_knight/IdleLeft.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    Run: {
      imageSrc: `./img/hero_knight/Run.png`,
      frameRate: 8,
      frameBuffer: 7,
    },
    RunLeft: {
      imageSrc: `./img/hero_knight/RunLeft.png`,
      frameRate: 8,
      frameBuffer: 7,
    },
    Jump: {
      imageSrc: `./img/hero_knight/Jump.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    JumpLeft: {
      imageSrc: `./img/hero_knight/JumpLeft.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    Fall: {
      imageSrc: `./img/hero_knight/Fall.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    FallLeft: {
      imageSrc: `./img/hero_knight/FallLeft.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    //Combat animations
    Attack1: {
      imageSrc: `./img/hero_knight/Attack1.png`,
      frameRate: 7,
      frameBuffer: 4,
    },
    Attack1Left: {
      imageSrc: `./img/hero_knight/Attack1Left.png`,
      frameRate: 7,
      frameBuffer: 4,
    },
    Attack2: {
      imageSrc: `./img/hero_knight/Attack2.png`,
      frameRate: 7,
      frameBuffer: 4,
    },
    Attack2Left: {
      imageSrc: `./img/hero_knight/Attack2Left.png`,
      frameRate: 7,
      frameBuffer: 4,
    },
    Death: {
      imageSrc: `./img/hero_knight/Death.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    DeathLeft: {
      imageSrc: `./img/hero_knight/DeathLeft.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    TakeHit: {
      imageSrc: `./img/hero_knight/TakeHit.png`,
      frameRate: 4,
      frameBuffer: 4,
    },
    TakeHitLeft: {
      imageSrc: `./img/hero_knight/TakeHitLeft.png`,
      frameRate: 4,
      frameBuffer: 4,
    },
  },
});

const player2 = new Player({
  position: {
    x: 360,
    y: 300,
  },
  lastDirection: `left`,
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: `./img/hero_knight/Idle.png`,
  frameRate: 11,
  animations: {
    //Movement animations
    Idle: {
      imageSrc: `./img/hero_knight/Idle.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    IdleLeft: {
      imageSrc: `./img/hero_knight/IdleLeft.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    Run: {
      imageSrc: `./img/hero_knight/Run.png`,
      frameRate: 8,
      frameBuffer: 7,
    },
    RunLeft: {
      imageSrc: `./img/hero_knight/RunLeft.png`,
      frameRate: 8,
      frameBuffer: 7,
    },
    Jump: {
      imageSrc: `./img/hero_knight/Jump.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    JumpLeft: {
      imageSrc: `./img/hero_knight/JumpLeft.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    Fall: {
      imageSrc: `./img/hero_knight/Fall.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    FallLeft: {
      imageSrc: `./img/hero_knight/FallLeft.png`,
      frameRate: 3,
      frameBuffer: 7,
    },
    //Combat animations
    Attack1: {
      imageSrc: `./img/hero_knight/Attack1.png`,
      frameRate: 7,
      frameBuffer: 4,
    },
    Attack1Left: {
      imageSrc: `./img/hero_knight/Attack1Left.png`,
      frameRate: 7,
      frameBuffer: 10,
    },
    Attack2: {
      imageSrc: `./img/hero_knight/Attack2.png`,
      frameRate: 7,
      frameBuffer: 4,
    },
    Attack2Left: {
      imageSrc: `./img/hero_knight/Attack2Left.png`,
      frameRate: 7,
      frameBuffer: 10,
    },
    Death: {
      imageSrc: `./img/hero_knight/Death.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    DeathLeft: {
      imageSrc: `./img/hero_knight/DeathLeft.png`,
      frameRate: 11,
      frameBuffer: 6,
    },
    TakeHit: {
      imageSrc: `./img/hero_knight/TakeHit.png`,
      frameRate: 4,
      frameBuffer: 4,
    },
    TakeHitLeft: {
      imageSrc: `./img/hero_knight/TakeHitLeft.png`,
      frameRate: 4,
      frameBuffer: 4,
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
  arrowRight: {
    pressed: false,
  },
  arrowLeft: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
  q: {
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

decreaseTimer();

//start animation
function animate() {
  //animation loop
  requestAnimationFrame(animate);
  //save
  c.save();
  //scale up background image
  c.scale(4, 4);
  c.translate(camera.position.x, camera.position.y);
  //put background in game
  background.update();
  //check for edge collisions
  player.checkForHorizontalCanvasCollision();
  player2.checkForHorizontalCanvasCollision();
  //put players into the game
  player.update();
  player2.update();

  //player 1 check hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: player2,
    }) &&
    player.isAttacking
  ) {
    player2.takeHit();
    player.isAttacking = false;
    gsap.to('#enemyHealth', {
      width: `${player2.health}%`
    })
    console.log(`player 2 take hit health: ${player2.health}`);
  }

  //player 2 check hit
  if (
    rectangularCollision({
      rectangle1: player2,
      rectangle2: player,
    }) &&
    player2.isAttacking
  ) {
    player.takeHit()
    player2.isAttacking = false;
    gsap.to('#playerHealth', {
      width: `${player.health}%`
    })
    console.log(`player 1 take hit health: ${player.health}`);
  }

  // player 1 movement animations
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

  //player 1 attack animations

  // player 2 movement animations
  player2.velocity.x = 0;
  if (keys.arrowRight.pressed) {
    player2.switchSprite("Run");
    player2.velocity.x = 1.5;
    player2.lastDirection = "right";
    player2.shouldPanCameraToLeft({ canvas, camera });
  } else if (keys.arrowLeft.pressed) {
    player2.switchSprite("RunLeft");
    player2.velocity.x = -1.5;
    player2.lastDirection = "left";
    player2.shouldPanCameraToRight({ canvas, camera });
  } else if (player2.velocity.y === 0) {
    if (player2.lastDirection === "right") {
      player2.switchSprite("Idle");
    } else {
      player2.switchSprite("IdleLeft");
    }
  }

  if (player2.velocity.y < 0) {
    player2.shouldPanCameraDown({ camera, canvas });
    if (player2.lastDirection === "right") {
      player2.switchSprite("Jump");
    } else {
      player2.switchSprite("JumpLeft");
    }
  } else if (player2.velocity.y > 0) {
    player2.shouldPanCameraUp({ camera, canvas });
    if (player2.lastDirection === "right") {
      player2.switchSprite("Fall");
    } else {
      player2.switchSprite("FallLeft");
    }
  }

  //player 2 attack animations

  //restore
  c.restore();
}

//start animation
animate();
//key presses
addEventListener(`keydown`, (e) => {
  switch (e.key) {
    //player 1
    case `d`:
      keys.d.pressed = true;
      break;

    case `a`:
      keys.a.pressed = true;
      break;

    case `w`:
      player.doubleJump++;
      if (player.doubleJump >= 3) {
        break;
      }
      player.velocity.y = -3.1;
      break;

    //player 2
    case `ArrowRight`:
      keys.arrowRight.pressed = true;
      break;

    case `ArrowLeft`:
      keys.arrowLeft.pressed = true;
      break;

    case `ArrowUp`:
      player2.doubleJump++;
      if (player2.doubleJump >= 3) {
        break;
      }
      player2.velocity.y = -3.1;
      break;

    //combat Player 1

    case `q`:
      console.log("player 1 attack")
      player.attack();
      break;

    //combar Player 2

    case ` `:
      console.log("player 2 attack")
      player2.attack();
      break;
  }
});

addEventListener(`keyup`, (e) => {
  switch (e.key) {
    //player 1 keyup
    case `d`:
      keys.d.pressed = false;
      break;

    case `a`:
      keys.a.pressed = false;
      break;

    //player 2 keyup
    case `ArrowRight`:
      keys.arrowRight.pressed = false;
      break;

    case `ArrowLeft`:
      keys.arrowLeft.pressed = false;
      break;
  }
});
