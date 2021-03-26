var scaleFactor;
var angle = [];
var sectors = 5;
var mouseA;
var prevMouseA;
var selected = false;
var angleSelected = 0;
var colors = [];
var labels = [];

function colorsAndLabels() {
  var t = 255;
  colors[0] = color(100, 200, 100, t);
  colors[1] = color(200, 100, 100, t);
  colors[2] = color(130, 130, 200, t);
  colors[3] = color(50, 200, 200, t);
  colors[4] = color(200, 200, 50, t);
  labels[0] = 'work';
  labels[1] = 'wellbeing';
  labels[2] = 'family';
  labels[3] = 'friends';
  labels[4] = 'learning';
}

function setup() {
/* if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    createCanvas(displayWidth, displayHeight);
  } else {
    createCanvas(windowWidth, windowHeight);
  }*/
  createCanvas(windowWidth, windowHeight);
  if (width / 350 < height / 550) {
    scaleFactor = width / 350;
  } else {
    scaleFactor = height / 550;
  }
  createCanvas(350, 550);
  // determine angles
  colorsAndLabels();
  angleMode(DEGREES);
  for (var i = 0; i < sectors; i++) {
    angle.push(360 * i / sectors);
  }
}

function draw() {
  background(100);
  // scale(scaleFactor);

  // render arcs (sectors)
  push();
  translate(175, 200);
  for (var i = 0; i < sectors; i++) {
    fill(colors[i]);
    strokeWeight(1);
    var a1 = angle[i];
    var a2 = angle[add(i, 1)];
    // if (i == sectors - 1) {
    //   a2 = 0;
    // }
    arc(0, 0, 300, 300, a1, a2, PIE);
  }
  fill(0);
  fill(colors[sectors - 1]);
  var a1 = angle[sectors - 1];
  var a2 = angle[0];
  if (a1 - a2 < 360) {
    arc(0, 0, 300, 300, angle[sectors - 1], angle[0], PIE);
  }


  // render labels
  textSize(15);
  textAlign(CENTER);
  // textSize(10 + (angle[i]) / 360 * 40);
  fill(0);
  strokeWeight(0.1);
  for (var i = 0; i < sectors; i++) {
    var textX = 120 * 0.6 * cos((angle[i] + angle[add(i, 1)]) / 2);
    var textY = 120 * 0.6 * sin((angle[i] + angle[add(i, 1)]) / 2);
    text(labels[i], textX, textY);
  }
  var textX = 120 * 0.6 * cos((angle[sectors - 1] + 360 + angle[0]) / 2);
  var textY = 120 * 0.6 * sin((angle[sectors - 1] + 360 + angle[0]) / 2);
  text(labels[sectors - 1], textX, textY);
  pop();


  // render additional information
  textAlign(LEFT);
  textSize(13);
  fill(0);
  text('work: school, chores\nlearning: flute, reading, writing, podcasting, coding\nwellbeing: outdoors, exersize, food, meditation', 10, 440);


  // mouse detection
  prevMouseA = mouseA;
  a = atan2(mouseY - 200, mouseX - 175);
  if (a > 0) {
    mouseA = a;
  } else {
    mouseA = 360 + a;
  }
  if (selected) {
    if (prevMouseA - mouseA < -20 || mouseA - prevMouseA < -20) {
      mouseA = prevMouseA;
    }
  }

  // drag movement
  for (var j = 0; j < sectors; j++) {
    if (selected && j == angleSelected) {
      angle[j] = mouseA;
      for (var m = 0; m < 3; m++) {
        var n = m + 1;
        if (mouseA > angle[add(j, n)]) {
          angle[add(j, n)] = mouseA;
        }
        if (mouseA < angle[add(j, -n)]) {
          angle[add(j, -n)] = mouseA;
        }
      }

    }
  }
}

function mousePressed() {
  for (var i = 0; i < sectors; i++) {
    if (mouseA > angle[i] - 10 && mouseA < angle[i] + 10) {
      selected = true
      angleSelected = i;
      prevMouseA = mouseA;
    }
  }
  print('mouse');
}

function mouseReleased() {
  selected = false;
}

function touchMoved() {
  return false;
}

function add(int, toAdd) {
  int += toAdd;
  return int;
}