function setup() {
  // put setup code here
  createCanvas(500,500);
  frameRate(15);
}

var speed = 25;

var highscore = 0;

var score = 0;

var head = {
  x: 0,
  y: 0,
  xvel: speed,
  yvel: 0
};

var candy = {
  x: Math.floor(Math.random() * (500/speed)) * speed,
  y: Math.floor(Math.random() * (500/speed)) * speed
};

var bodies = [];

function draw() {
  // put drawing code
  score = bodies.length + 1;
  if (score > highscore) {
    highscore = score;
  }
  background(150);
  textSize(40);
  fill(50);
  text('Score: ' + score, 200, 50);
  textSize(18);
  text('Highscore: ' + highscore, 220, 70);
  fill('white');
  if (bodies.length >= 1) {
    var prevLast = [bodies[bodies.length-1].x, bodies[bodies.length-1].y];
  }
  for (var i=bodies.length-1; i > 0; i--) {
    bodies[i].x = bodies[i-1].x;
    bodies[i].y = bodies[i-1].y;
    rect(bodies[i].x, bodies[i].y, speed, speed);
  }
  if (bodies.length >= 1) {
    bodies[0].x = head.x;
    bodies[0].y = head.y;
    rect(bodies[0].x, bodies[0].y, speed, speed);
  }
  head.x += head.xvel;
  head.y += head.yvel;

/*

  if (head.x >= 500) {
    head.x = 0;
  }
  if (head.x < 0) {
    head.x = 500 - speed;
  }
  if (head.y >= 500) {
    head.y = 0;
  }
  if (head.y < 0) {
    head.y = 500 - speed;
  }

*/

  if (loseCondition()) {
    head.x = 0;
    head.y = 0;
    head.xvel = speed;
    head.yvel = 0;
    bodies = [];
  }
  rect(head.x, head.y, speed, speed);
  if (hitCandy()) {
    addBody(prevLast);
    newLocation = newCandy();
    if (newLocation == 'win') {
      textSize(60);
      fill(256,0,0);
      text('You Win', 175, 250);
      noLoop();
    }
    candy.x = newLocation[0];
    candy.y = newLocation[1];
  }
  fill('red');
  rect(candy.x, candy.y, speed,speed);
}

function addBody(prevLast) {
  if (bodies.length == 0) {
    bodies.push({
      x: head.x - head.xvel,
      y: head.y - head.yvel
    });
  }
  else {
    bodies.push({
      x: prevLast[0],
      y: prevLast[1]
    });
  }
}

function hitCandy() {
  return (head.x == candy.x && head.y == candy.y);
}

function newCandy() {
  if ((score+1) == 50) { // CHANGE
    return 'win'
  }
  already = [[head.x,head.y]];
  for (var i = 0; i < bodies.length; i++) {
    already.push([bodies[i].x, bodies[i].y]);
  }
  var x = Math.floor(Math.random() * (500/speed)) * speed;
  var y = Math.floor(Math.random() * (500/speed)) * speed;
  while (includesArray(already,[x,y])) {
    x = Math.floor(Math.random() * (500/speed)) * speed;
    y = Math.floor(Math.random() * (500/speed)) * speed;
  }
  return [x,y];
}

function includesArray(original,looking) {
  for (var i = 0; i < original.length; i++) {
    if (original[i] == looking) {
      return true
    }
  return false
  }
}

function loseCondition() {
  if (head.x >= 500 || head.x < 0) {
    return true
  }
  if (head.y >= 500 || head.y < 0) {
    return true
  }
  for (var i = 0; i < bodies.length; i++) {
    if (head.x == bodies[i].x && head.y == bodies[i].y) {
      return true
    }
  }
  return false
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    if (head.xvel != speed) {
      head.xvel = -1*speed;
      head.yvel = 0;
    }
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    if (head.xvel != -1*speed) {
      head.xvel = speed;
      head.yvel = 0;
    }
  } else if (keyCode === UP_ARROW || keyCode === 87) {
    if (head.yvel != speed) {
      head.xvel = 0;
      head.yvel = -1*speed;
    }
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    if (head.yvel != -1*speed) {
      head.xvel = 0;
      head.yvel = speed;
    }
  }
}
