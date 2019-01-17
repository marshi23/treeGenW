// tree size
let s = 0;
let levelMax = 8;
let lengthRand = 1.0;
let sizeDecay = 0.7;
let lengthDecay = 0.91

// wind / movement
let windFactor = 1.0;
// let windEnabled = true;

// color
let branchColor;
let branchHue = 50;
let leafColor;
let leafHue = 150;
let flowerColor;


// blooming
let doesBloom;
let bloomSize;
let bloomSizeAverage = 50;
let bloomWidthRatio = 0.6;

// flower
let doesFlower = true;
let flowerScale = 0.0;
let flowerScaleT = 1.0;
let flowerBright = 255;
let flowerDelay;
let flowerChance = 0.1;
let flowerWidth = 10;
let flowerHeight = 20;


// leaf
let leafRot;
let leafScale = 0.0;
let leafDelay;
let leafLevel = 2;
let leafChance = 0.3;
let rotDecay = 1.1;

let tree1;
let tree2;


function Tree(len, size, rotRange, level, mouseWind, windEnabled) {
    this.len = len * (1 + random(-lengthRand, lengthRand));
    this.size = size;
    this.level = level;
    this.mouseWind = mouseWind;
    this.windEnabled = windEnabled;
    this.rot = radians(random(-rotRange, rotRange));

    if (level < leafLevel ) this.rot *= 0.3;
    if (level == 0 ) this.rot = 0;

    windFactor = random(0.1, 1);
    doesBloom = true;

    if (level >= leafLevel && random(1) < leafChance) doesBloom = true;

    bloomSize = random(bloomSizeAverage*0.7, bloomSizeAverage*1.3);
    leafRot = radians(random(-180, 180));
    flowerScaleT = random(0.8, 1.2);
    flowerDelay = round(random(200, 250));
    leafDelay = round(random(50, 150));
    randomizeColor();



    if (random(1) < flowerChance) doesFlower = true ;

    let rr = rotRange * rotDecay;

    if (level < levelMax) {
        tree1 = new Tree(this.len*lengthDecay, this.size*sizeDecay, rr, level+1, this.mouseWind, this.windEnabled);
        tree2 = new Tree(this.len*lengthDecay, this.size*sizeDecay, rr, level+1, this.mouseWind, this.windEnabled);
    }

    this.draw = function() {
      strokeWeight(this.size);
      s += (1.0 - s) / (15 + (level*5));
      scale(s);

      push();

      if (level >= leafLevel) stroke(165,42,42); // should be stroke(branchColor)
      else stroke(0);

      let rotOffset = sin( noise( millis() * 0.000006  * (level*1) ) * 100 );
      if (!windEnabled) rotOffset = 0 ;
      rotate(this.rot + (rotOffset * 0.1 + this.mouseWind) * windFactor);
      console.log(len);
      line(0, 0, 0, -this.len);
      translate(0, -this.len);

     // draw leaves
      if (doesBloom) {
        if (leafDelay < 0) {
          leafScale += (1.0 - leafScale) * 0.05;
          // fill(leafColor);
          fill(leafHue, leafSat, 100);
          noStroke();
          push();
          scale(leafScale);
          rotate(leafRot);
          console.log(bloomSize);
          translate(0, -bloomSize/2);
          ellipse(0, 0, bloomSize*bloomWidthRatio, bloomSize);
          pop();
        } else {
          leafDelay--;
        }
    }

     // draw flowers
     if (doesFlower && level > levelMax-3) {

        if (flowerDelay < 0) {
          push();
          flowerScale += (flowerScaleT - flowerScale) * 0.1;
          scale(flowerScale);
          rotate(flowerScale*3);
          noStroke();
          fill(hue(255, 0, 255), saturation(255, 0, 255), flowerBright);
          fill(hue(flowerColor), saturation(flowerColor), flowerBright);
          ellipse(0, 0, flowerWidth, flowerHeight);
          rotate(radians(360/3));
          ellipse(0, 0, flowerWidth, flowerHeight);
          rotate(radians(360/3));
          ellipse(0, 0, flowerWidth, flowerHeight);
          fill(branchHue, 255, 100);
          // fill(branchColor);
          ellipse(0, 0, 5, 5);
          pop();
        } else {
          flowerDelay--;
        }
      }
      // push();
      // if (tree1) tree1.draw();
      // pop();
      //
      //
      // push();
      // if (tree2) tree2.draw();
      // pop();
  pop();

  }

  push();
  if (tree1) tree1.draw();
  pop();


  push();
  if (tree2) tree2.draw();
  pop();

  //  this.randomizeColor = function() {
  //      branchColor = branchHue, round(random(170, 255)), round(random(100, 200));
  //      leafColor = color(leafHue, leafSat, round(random(100, 255)));
  //      flowerColor = round(random(255)), round(random(0, 255)), 255;
  //      flowerBright = round(random(200, 255));
  //
  //       if (tree1) tree1.randomizeColor();
  //       if (tree2) tree2.randomizeColor();
  // }

  this.randomize = function() {

    rotDecay = random(0.9, 1.1);
    lengthRand = random(0.0, 0.2);
    leafChance = random(0.3, 0.9);
    sizeDecay = random(0.6, 0.7);
    lengthDecay = map(startLength, 20, 80, 1.1, 0.85);

    leafLevel = round(random(0, 4));
    bloomWidthRatio = random(0.01, 0.9);
    bloomSizeAverage = round(random(10, 40));

    flowerWidth = random(5, 15);
    flowerHeight = random(10, 30);
    flowerChance = 0.1;
  }


}
