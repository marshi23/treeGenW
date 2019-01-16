let s = 0;
let levelMax = 8;

// wind / movement
let windFactor = 1.0;

// color
let branchColor;
let leafColor;

// flower
let doesBloom;
let bloomSize;
let bloomSizeAverage = 50;
let doesFlower = false;
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


  function Tree(len, size, rotRange, level, lengthRand, mouseWind) {
    this.len = len * (1 + random(-lengthRand, lengthRand*50));
    this.size = size;
    this.level = level;
    this.windEnabled = windEnabled;
    this.mouseWind = mouseWind;

    this.rot = radians(random(-rotRange, rotRange));

    if (level < leafLevel ) this.rot *= 0.3;
    if (level == 0 ) this.rot = 0;

    windFactor = random(0.1, 1);
    doesBloom = false;

    if (level >= leafLevel && random(1) < leafChance) doesBloom = true ;

    bloomSize = random(bloomSizeAverage*0.7, bloomSizeAverage*1.3);
    leafRot = radians(random(-180, 180));
    flowerScaleT = random(0.8, 1.2);
    flowerDelay = round(random(200, 250));
    leafDelay = random(50, 150);
    randomizeColor();



    if (random(1) < random(flowerChance)) doesFlower = true ;

    let rr = rotRange * rotDecay;



    if (level < levelMax) {
        tree1 = new Tree(this.len*lengthDecay, this.size*sizeDecay, rr, level+1, lengthRand);
        tree2 = new Tree(this.len*lengthDecay, this.size*sizeDecay, rr, level+1, lengthRand);
    }

    this.draw = function() {
      strokeWeight(this.size);
      s += (1.0 - s) / (15 + (level*5));
      scale(s);

      push();
        if (level >= leafLevel ) {
          stroke(165,42,42);
          // stroke(branchColor);
        } else {
          stroke(0);
        }


      let rotOffset = sin( noise( millis() * 0.000006  * (level*1) ) * 100 );
        // console.log(windEnabled)
      if (!this.windEnabled) rotOffset = 0 ;

      if (level >= leafLevel ) {
        stroke(165,42,42);
        // stroke(branchColor);
      } else {
        stroke(0);
      }
     rotate(this.rot + (rotOffset * 0.1 + this.mouseWind) * windFactor);
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
          translate(1, bloomSize/2);
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
  }



  if (tree1) {
    push();
      tree1.draw();
    pop();
  }

  if (tree2) {
    push();
      tree2.draw();
    pop();
  }


  this.randomizeColor = function() {
       branchColor = color(branchHue, random(170, 255), random(100, 200));
       leafColor = (leafHue, leafSat, random(100, 255));
       flowerBright = random(200, 255);

       if (tree1) tree1.randomizeColor();
       if (tree2) tree2.randomizeColor();
  }
}
