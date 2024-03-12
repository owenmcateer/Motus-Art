/**
 * Cluster growth
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let cols, rows;
let grid;
let resolutionTarget;
let growthProbability;
let holdTime = 120;

// Setup
function setup() {
  createCanvas(1080, 1080);
  init();
}

// Init random settings
function init() {
  holdTime = 120;

  resolutionTarget = round(min(random(5, 60), random(5, 60)));
  growthProbability = random(0.05, 0.2);

  cols = floor(width / resolutionTarget);
  rows = floor(height / resolutionTarget);

  // Correct resolution
  resolutionW = (width / cols);
  resolutionH = (height / rows);

  // Initialize grid with empty values
  grid = createEmptyGrid(cols, rows);

  // Seed the initial cluster
  seedCluster(floor(random(cols - 1)), floor(random(rows - 1)), 2);
}

// Draw tick
function draw() {
  background(39);
  fill(239);
  strokeWeight(1);
  stroke(0);

  // Update and display the grid
  updateGrid();
  displayGrid();

  // Border
  fill(0);
  stroke(239);
  drawWall(cols, rows);

  // Check for end state
  const totalGrid = (cols - 2) * (rows - 2);
  const totalSum = grid.flat().reduce((acc, curr) => acc + curr, 0);

  if (totalGrid >= totalSum) {
    holdTime--;
    if (holdTime < 0) {
      init();
    }
  }
}

// Draw border wall
function drawWall(cols, rows) {
  for (let i = 0; i < cols; i++) {
    rect(i * resolutionW, 0, resolutionW, resolutionH);
    rect(i * resolutionW, height - resolutionH, resolutionW, resolutionH);
  }
  for (let j = 1; j < rows - 1; j++) {
    rect(0, j * resolutionH, resolutionW, resolutionH);
    rect(width - resolutionW, j * resolutionH, resolutionW, resolutionH);
  }
}

// Update grid
function updateGrid() {
  let nextGrid = createEmptyGrid(cols, rows);

  // Loop through every spot in the grid and update the state
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      let neighbors = countNeighbors(grid, i, j);

      // If the cell is empty and has at least one neighbor, it might join the cluster
      if (grid[i][j] === 0 && neighbors > 0) {
        if (random() < growthProbability) {
          nextGrid[i][j] = 1;
        }
      } else {
        nextGrid[i][j] = grid[i][j];
      }
    }
  }

  // Update the grid to the new state
  grid = nextGrid;
}

// Draw grid
function displayGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolutionW;
      let y = j * resolutionH;

      if (grid[i][j] === 1) {
        rect(x, y, resolutionW, resolutionH);
      }
    }
  }
}

// Create starting grid
function createEmptyGrid(cols, rows) {
  let grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}

// Count neighbors
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      sum += grid[x + i][y + j];
    }
  }
  sum -= grid[x][y];
  return sum;
}

// Seed cluster
function seedCluster(x, y, size) {
  for (let i = x - size / 2; i < x + size / 2; i++) {
    for (let j = y - size / 2; j < y + size / 2; j++) {
      if (i >= 0 && i < cols && j >= 0 && j < rows) {
        grid[i][j] = 1;
      }
    }
  }
}
