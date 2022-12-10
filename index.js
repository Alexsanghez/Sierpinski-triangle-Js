const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");
c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

let points = 0;
const maxNumberOfPoints = 100000;

function drawPoint(x, y) {
  c.fillStyle = "white";
  c.beginPath();
  c.arc(x, y, 1, 0, 2 * Math.PI);
  c.fill();
}

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

const vertexA = new Point(canvas.width / 2, canvas.height / 10);
const vertexB = new Point(canvas.width / 4, canvas.height / 1.1);
const vertexC = new Point(canvas.width / 1.3, canvas.height / 1.1);

let triangle = new Path2D();
triangle.moveTo(vertexA.x, vertexA.y);
triangle.lineTo(vertexB.x, vertexB.y);
triangle.lineTo(vertexC.x, vertexC.y);
triangle.lineTo(vertexA.x, vertexA.y);
c.strokeStyle = "white";
c.stroke(triangle);

let randomInitialPoint = new Point();
do {
  randomInitialPoint = new Point(
    getRandomPoint(canvas.width),
    getRandomPoint(canvas.height)
  );
} while (
  !c.isPointInPath(triangle, randomInitialPoint.x, randomInitialPoint.y)
);

function animate() {
  let vertex = selectRandomVertexPoint();

  let pointToDraw = new Point(
    (randomInitialPoint.x + vertex.x) / 2,
    (randomInitialPoint.y + vertex.y) / 2
  );

  drawPoint(pointToDraw.x, pointToDraw.y);
  randomInitialPoint = pointToDraw;
  points++;
  if (points < maxNumberOfPoints) {
    reqAnim = window.requestAnimationFrame(animate);
  }
}

animate();
