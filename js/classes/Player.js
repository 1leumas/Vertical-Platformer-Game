class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc,
    frameRate,
    scale = 0.56,
    animations,
    lastDirection = "right",
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
    //animations
    this.animations = animations;
    //last direction
    this.lastDirection = lastDirection;
    //swapping between images
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }

    this.cameraBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 250,
      height: 150,
    };

    this.doubleJump = 0;

    this.attackBox = {
      position: this.position,
      width: 22,
      height: 5,
    };

    this.isAttacking = false;
    this.health = 100;
    this.framesCurrent = 0;
    this.isTakingDamage = false;
  }

  //swapping between images
  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;
    if (this.image === this.animations[`Death`].image) return;
    if (this.image === this.animations[`TakeHit`].image && this.isTakingDamage) return;
    if (this.image === this.animations[`TakeHitLeft`].image && this.isTakingDamage) return;
    if(this.image === this.animations[`Attack1`].image && this.isAttacking) return;
    if(this.image === this.animations[`Attack1Left`].image && this.isAttacking) return;
    if(this.image === this.animations[`Attack2`].image && this.isAttacking) return;
    if(this.image === this.animations[`Attack2Left`].image && this.isAttacking) return;

    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  updateCameraBox() {
    this.cameraBox = {
      position: {
        x: this.position.x - 75,
        y: this.position.y - 30,
      },
      width: 250,
      height: 150,
    };
  }

  shouldPanCameraToLeft({ canvas, camera }) {
    const cameraboxRightSide = this.cameraBox.position.x + this.cameraBox.width;
    const scaledDownCanvasWidth = canvas.width / 4;

    if (cameraboxRightSide >= 576) return;

    if (
      cameraboxRightSide >=
      scaledDownCanvasWidth + Math.abs(camera.position.x)
    ) {
      camera.position.x -= this.velocity.x;
    }
  }

  shouldPanCameraToRight({ canvas, camera }) {
    if (this.cameraBox.position.x <= 0) return;

    if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  shouldPanCameraDown({ canvas, camera }) {
    if (this.cameraBox.position.y + this.velocity.y <= 0) return;
    if (this.cameraBox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y;
    }
  }

  shouldPanCameraUp({ canvas, camera }) {
    const scaledCanvasHeight = canvas.height / 4;

    if (
      this.cameraBox.position.y + this.cameraBox.height + this.velocity.y >=
      432
    )
      return;

    if (
      this.cameraBox.position.y + this.cameraBox.height >=
      Math.abs(camera.position.y) + scaledCanvasHeight
    ) {
      camera.position.y -= this.velocity.y;
    }
  }

  update() {
    this.updateFrames();
    this.updateHitbox();
    this.updateCameraBox();

    //this draws out the image
    // c.fillStyle = `rgba(255, 255, 0, 0.2)`;
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //hitbox style
    // c.fillStyle = `rgba(0, 0, 255, 0.2)`;
    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );

    //camera style
    // c.fillStyle = `rgba(0, 0, 255, 0.2)`;
    // c.fillRect(
    //   this.cameraBox.position.x,
    //   this.cameraBox.position.y,
    //   this.cameraBox.width,
    //   this.cameraBox.height
    // );

    this.draw();

    this.position.x += this.velocity.x;
    this.updateHitbox();
    //check for horizontal collision
    this.checkForHorizontalCollisions();
    //apply gravity method
    this.applyGravity();
    this.updateHitbox();

    this.updateAttackBox();
    //check for vertical collision
    this.checkForVerticalCollisions();

    //hitbox style
    // c.fillStyle = "rgba(0, 0, 255, 0.2)";
    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );

    //attackbox style
    // c.fillStyle = "rgba(255, 0, 0, 0.5)";
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );
  }

  // update attack box with player last direction
  updateAttackBox() {
    if (this.lastDirection === "right") {
      this.attackBox = {
        position: {
          x: this.position.x + 53.7,
          y: this.position.y + 45,
        },
        width: 22,
        height: 10,
      };
    } else if (this.lastDirection === "left") {
      this.attackBox = {
        position: {
          x: this.position.x + 25,
          y: this.position.y + 45,
        },
        width: 22,
        height: 10,
      };
    }
  }

  //update hitbox with player last direction
  updateHitbox() {
    if (this.lastDirection === "right") {
      this.hitbox = {
        position: {
          x: this.position.x + 43,
          y: this.position.y + 38.5,
        },
        width: 22,
        height: 25,
      };
    } else if (this.lastDirection === "left") {
      this.hitbox = {
        position: {
          x: this.position.x + 36,
          y: this.position.y + 38.5,
        },
        width: 22,
        height: 25,
      };
    }
  }

  //check horizontal collision with the map
  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0;
    }
  }

  //check for horizontal collision with blocks
  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;

          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;

          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0;

          const offset = this.hitbox.position.x - this.position.x;

          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  //method to player falls down if hes not on bottom of y axis
  applyGravity() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }

  //check for vertical collision with blocks
  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.doubleJump = 0;

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;

          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0;

          const offset = this.hitbox.position.y - this.position.y;

          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }

    // Platform Collision Blocks
    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const platformCollisionBlock = this.platformCollisionBlocks[i];

      if (
        platformCollision({
          object1: this.hitbox,
          object2: platformCollisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.doubleJump = 0;

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;

          this.position.y = platformCollisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }

  //combat

  attack() {
    if (this.isAttacking) return;
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 270);
    if (this.lastDirection === `right`) {
      Math.random() < 0.5 ? this.switchSprite(`Attack1`) : this.switchSprite(`Attack2`);
    } else {
      Math.random() < 0.5 ? this.switchSprite(`Attack1Left`) : this.switchSprite(`Attack2Left`);
    }
  }

  takeHit() {
    if(this.isTakingDamage) return;

    this.health -= 10;

    this.isTakingDamage = true;
    setTimeout(() => {
      this.isTakingDamage = false;
    }, 350);

    if (this.health <= 0) {
      if (this.lastDirection === `right`) {
        this.switchSprite(`Death`);
      } else {
        this.switchSprite(`DeathLeft`);
      }
    } else {
      if (this.lastDirection === `right`) {
        this.switchSprite(`TakeHit`);
      } else {
        this.switchSprite(`TakeHitLeft`);
      }
    }
  }
}
