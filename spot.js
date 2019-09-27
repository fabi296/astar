class Spot {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
        this.previous = null;
        this.wall = false;
        if (random(1) < 0.4) {
            this.wall = true;
        }
    }
}

Spot.prototype.show = function(col) {
    if (this.wall) {
        fill(0);
        noStroke();
        ellipse(this.i * w + w/2, this.j * h + h/2, w/2, h/2);
    }
    else if(col) {
        fill(col);
        noStroke();
        rect(this.i * w, this.j *h, w, h);
    }
}

Spot.prototype.addNeighbors = function(grid) {
    let i = this.i;
    let j = this.j;
    let neighbors = this.neighbors;

    if (i < cols-1)
        neighbors.push(grid[i+1][j]);
    if (i > 0)
        neighbors.push(grid[i-1][j]);
    if (j < rows-1)
        neighbors.push(grid[i][j+1]);
    if (j > 0)
        neighbors.push(grid[i][j-1]);
    if (i < cols-1 && j < rows-1)
        neighbors.push(grid[i+1][j+1]);
    if (i > 0 && j > 0)
        neighbors.push(grid[i-1][j-1]);
    if (i < cols-1 && j > 0)
        neighbors.push(grid[i+1][j-1]);
    if (i > 0 && j < rows-1)
        neighbors.push(grid[i-1][j+1]);
}