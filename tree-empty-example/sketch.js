let autoplay = false;
let showFrameRate = false;
let clearsBackground = true;

let rotRange = 10;
let sizeDecay = 0.7;
let lengthDecay = 0.91
let time = 0;
let lengthRand = 1.0;
let bloomWidthRatio = 0.6;
let mDamp = 0.00002;
let wDamp = 0.003;
let mFriction = 0.98;

// tree
let rotRange = 10;
let tree;
let startLength;
let startSize;
let level = 10;

// mouse force
let mDamp = 0.00002;
let wDamp = 0.003;
let mFriction = 0.98;

// wind
let mouseWind = 0;
let mouseWindV = 0;
let windEnable = true;

// colors
let bgColor;

function setup() {
  createCanvas(900, 900);
  colorMode(HSB);
  ellipseMode(CENTER);

  randomize();
  reset();
}

function reset() {
  background(bgColor);
  tree = new Tree(startLength, startSize, rotRange, 0, mouseWind, windEnable);
};

function randomize() {
  randomizeBackground();
  randomizeColor();
  rotRange = random(20, 60);
  startLength = random(20, 80);
  startSize = random(3, 20);

  mDamp = 0.00002;
  wDamp = 0.005;
  mFriction = 0.96;
}

function randomizeBackground() {
    bgColor = color(floor(random(255)), floor(random(0, 100)), 255);
}

function randomizeColor() {
  if (tree) tree.randomizeColor();
}

function keyPressed() {
  if (key == 'f') showFrameRate = !showFrameRate;
  if (key == 'a') autoplay = !autoplay;
  if (key == 'p') clearsBackground = !clearsBackground;
  if (key == 'w') windEnabled = !windEnabled;
  if (key == 'r') reset();
  if (key == 'b') randomizeBackground();
  if (key == 'c') randomizeColor();
  if (key == 'k' && tree) tree.randomize();
}

function mousePressed() {
  time = 0;
  randomize();
  reset();
  if(tree) tree.randomize();
}

function displayFrameRatePS() {
  fill(150);
  let output = "fps=";
  output += frameRate();
  text(output, 10, 30);
}

function draw() {

  if (autoplay) {
    time++;
    if (time > 600) {
      time = 0;
      randomize();
      if (tree) tree.randomize()
      reset();
    }
  }

  let dx = mouseX - pmouseX;
  mouseWindV += dx * mDamp;
  mouseWindV += (0 - mouseWind) * wDamp;
  mouseWindV *= mFriction;
  mouseWind += mouseWindV;

  if (clearsBackground) background(bgColor);
  if (showFrameRate) displayFrameRatePS();
  translate(width/2, height);
  tree.draw();

}
