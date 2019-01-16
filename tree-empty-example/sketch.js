let autoplay = false;
let showFrameRate = false;
let clearsBackground = true;
let font;


let rotRange = 10;
let rotDecay = 1.1;
let sizeDecay = 0.7;
let lengthDecay = 0.91
let time = 0;
let lengthRand = 1.0;
let bloomWidthRatio = 0.6;
let bloomSizeAverage = 15;
let mDamp = 0.00002;
let wDamp = 0.003;
let mFriction = 0.98;

// tree
let tree;
let startLength;
let startSize;

// wind
let windEnabled = true;
let mouseWind = 0;
let mouseWindV = 0;

// leaf
let leafChance = 0.3;
let leafLevel = 2;

// flower
// let flowerChance = 0.1;
let flowerWidth = 10;
let flowerHeight = 20;

// colors
let bgColor;
let branchHue = 50;
let leafHue = 150;
let leafSat = 100;
let trunkColor;
let bgColorlet;
let flowerColor;

function setup() {
  createCanvas(900, 900);


  colorMode(HSB);
  ellipseMode(CENTER);
  // frameRate(3);

  randomize();
  reset();
}

function reset() {
  background(bgColor);
  tree = new Tree(startLength, startSize, rotRange, 50,
    lengthRand, leafLevel, leafChance, bloomSizeAverage,
    rotDecay, windEnabled, mouseWind);
};

function randomize() {

  randomizeBackground();
  randomizeColor();
  rotRange = random(20, 60);
  rotDecay = random(0.9, 1.1);
  startLength = random(20, 80);
  startSize = round(random(3, 20));
  lengthRand = random(0.0, 0.2);
  leafChance = random(0.3, 0.9);
  sizeDecay = random(0.6, 0.7);
  lengthDecay = map(startLength, 20, 80, 1.1, 0.85);
  leafLevel = round(random(0, 4));
  bloomWidthRatio = random(0.01, 0.9);
  bloomSizeAverage = round(random(10, 40));

  mDamp = 0.00002;
  wDamp = 0.005;
  mFriction = 0.96;

  flowerWidth = random(5, 15);
  flowerHeight = random(10, 30);
  // flowerChance = 0.1;
}

function randomizeBackground() {
    bgColor = color(floor(random(255)), floor(random(0, 100)), 255);
}

function randomizeColor() {
  branchHue = round(random(0, 255));
  leafHue = round(random(0, 255));
  leafSat = round(random(0, 255));
  flowerColor = round(random(255)), round(random(0, 255)), 255;
  // if (tree) tree.randomizeColor();
}

function keyPressed() {
  if (key == 'f') showFrameRate = !showFrameRate;
  if (key == 'a') autoplay = !autoplay;
  if (key == 'p') clearsBackground = !clearsBackground;
  if (key == 'w') windEnabled = !windEnabled;
  if (key == 'r') reset();
  if (key == 'b') randomizeBackground();
  if (key == 'c') randomizeColor();
}

function mousePressed() {
  time = 0;
  randomize();
  reset();
}

function displayFrameRatePS() {
  // textFont(font, 18);
  fill(150);
  let output = "fps=";
  output += frameRate();
  text(output, 10, 30);
}

function draw() {

  if (autoplay)
  {
    time++;
    if (time > 600)
    {
      time = 0;
      randomize();
      // flowerChance = 0.1;
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
