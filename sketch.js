let cols = 50;
let rows = 50;
let grid = new Array(cols);
let start, end;
let w,h;
let closedSet = [];
let openSet = [];
let current;
let path = [];
let distance;

Array.prototype.remove = function(elt) {
  for (let i = this.length-1; i >= 0; i--) {
    if (this[i] == elt) {
      this.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  let d = dist(a.i, a.j, b.i, b.j);
  return d;
}

function calcDist(arr) {
  let totalDist = 0;
  for (let i = 0; i < arr.length-1; i++) {
    let tempD = dist(arr[i].i, arr[i].j, arr[i+1].i, arr[i+1].j);
    totalDist += tempD;
  }
  return totalDist * 10;
}

function setup() {
  createCanvas(400, 400);
  console.log("A*");
  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols-1][rows-1];
  start.wall = false;
  end.wall = false;
  openSet.push(start);
}

function draw() {
  if (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    current = openSet[winner];

    if (current == end) {
      console.log("Done!");
      distance = calcDist(path);
      console.log(distance);
      noLoop();
      return;
    }

    openSet.remove(current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        }
        else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }
  else {
    console.log("No Solution");
    noLoop();
    return;
  }
  background(255);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0 , 0, 50));
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0, 50));
  }
  path = [];
  let temp = current;
  path.push(temp);
  while(temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  noFill();
  stroke(250, 0, 200);
  strokeWeight(w/2);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w/2, path[i].j * h + h/2);
  }
  endShape();
}