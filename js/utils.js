function collision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}

function platformCollision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y + object1.height <=
      object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.hitbox.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.hitbox.position.x + rectangle2.hitbox.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.hitbox.position.y &&
    rectangle1.attackBox.position.y <=
      rectangle2.hitbox.position.y + rectangle2.hitbox.height
  );
}

let timer = 120;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, player2, timerId });
  }
}

function determineWinner({ player, player2, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";
  if (player.health === player2.health) {
    document.querySelector("#displayText").innerHTML = "Tie";
  } else if (player.health > player2.health) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins";
  } else if (player.health < player2.health) {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins";
  }
}
