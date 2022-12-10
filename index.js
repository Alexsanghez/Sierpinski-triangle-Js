/*
source = https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle

1.Take three points in a plane to form a triangle.
2.Randomly select any point inside the triangle and consider that your current position.
3.Randomly select any one of the three vertex points.
4.Move half the distance from your current position to the selected vertex.
5.Plot the current position.
6.Repeat from step 3. 
*/

// Get canvas properties
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set context and background
const c = canvas.getContext("2d");
c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

// Set maximum number of points to draw
let points = 0;
const maxNumberOfPoints = 100000;

function drawPoint(x, y) {
  c.fillStyle = "white";
  c.beginPath();
  c.arc(x, y, 1, 0, 2 * Math.PI);
  c.fill();
}

// Function to get a random number to set as coordinate of point
function getRandomPoint(max) {
  return Math.random() * max;
}

function selectRandomVertexPoint() {
  let vertex = Math.floor(Math.random() * 3);

  switch (vertex) {
    case 0:
      return vertexA;
    case 1:
      return vertexB;
    case 2:
      return vertexC;
    default:
      break;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//Setting vertices of first triangle
let radius = 250;
let h = canvas.width / 2;
let k = canvas.height / 2 + 50;
const vertexA = new Point(h - (Math.sqrt(3) * radius) / 2, k + radius / 2);
const vertexB = new Point(h + (Math.sqrt(3) * radius) / 2, k + radius / 2);
const vertexC = new Point(h, k - radius);

// Creating triangle Path first triangle
let triangle = new Path2D();
triangle.moveTo(vertexA.x, vertexA.y);
triangle.lineTo(vertexB.x, vertexB.y);
triangle.lineTo(vertexC.x, vertexC.y);
triangle.lineTo(vertexA.x, vertexA.y);

//Setting first random point to land in triangle
let randomInitialPoint = new Point();
do {
  randomInitialPoint = new Point(
    getRandomPoint(canvas.width),
    getRandomPoint(canvas.height)
  );
} while (
  !c.isPointInPath(triangle, randomInitialPoint.x, randomInitialPoint.y)
);

/*  Animation of the points that forms the serpinski trinagle
    for each frame of animation choose a random vertex of the original triangle
    then calculates the median between the choosen vertex and random starting point
    and iterates to form the serpinski triangle
*/
function animate() {
  let vertex = selectRandomVertexPoint();

  let pointToDraw = new Point(
    (randomInitialPoint.x + vertex.x) / 2,
    (randomInitialPoint.y + vertex.y) / 2
  );

  drawPoint(pointToDraw.x, pointToDraw.y);
  randomInitialPoint = pointToDraw;

  points++;
  // if the animation hasn't reached the maximum allowed points continues
  if (points < maxNumberOfPoints) {
    reqAnim = window.requestAnimationFrame(animate);
  }
}

animate();
