class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5 }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.collisionBlocks = collisionBlocks;
  }

  update() {
    this.updateFrames();
    c.fillStyle = `rgba(0, 255, 0, 0.2)`;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.draw();
    this.position.x += this.velocity.x;
    //check for horizontal collision
    this.checkForHorizontalCollisions();
    //apply gravity method
    this.applyGravity();
    //check for vertical collision
    this.checkForVerticalCollisions();
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
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

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
      }
    }
  }
}
