const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let grid = [];
let biasFactor = null;
let payments = [];

function generateRandomChar() {
  return String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Generates a random lowercase letter (a-z)
}

function generateGrid() {
  for (let i = 0; i < 10; i++) {
    grid[i] = []; // Initialize the inner array

    for (let j = 0; j < 10; j++) {
      // Assign values to each element in the grid
      grid[i][j] = generateRandomChar();
    }
  }
}

function getCode() {
  const time = new Date();
  const seconds = ("0" + time.getSeconds()).slice(-2);
  const charArray = ("" + seconds).split("");
  const [firstDigit, secondDigit] = charArray.map(Number);

  const char1 = grid[firstDigit][secondDigit];
  const char2 = grid[secondDigit][firstDigit];

  const count1 = grid.flat().filter((char) => char === char1).length;
  const count2 = grid.flat().filter((char) => char === char2).length;

  const code1 = count1 <= 9 ? count1 : Math.floor(count1 / 9);
  const code2 = count2 <= 9 ? count2 : Math.floor(count2 / 9);

  return `${code1}${code2}`;
}

function applyBias(grid) {
  if (biasFactor) {
    const totalCells = grid.flat().length;
    const numberOfCellsToFillWithBias = Math.round(totalCells * 0.2);

    for (let i = 0; i < numberOfCellsToFillWithBias; i++) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      grid[row][col] = biasFactor;
    }
  }
}

app.get("/api/grid", (req, res) => {
  generateGrid();
  applyBias(grid);
  res.json(grid);
});

app.get("/api/code", (req, res) => {
  const code = getCode();
  res.json({ code });
});

app.post("/api/bias", (req, res) => {
  const { bias } = req.body;

  biasFactor = bias;
  res.json({ success: true });
});

app.post("/api/payments", (req, res) => {
  if (!grid.length) {
    generateGrid();
    applyBias(grid);
  }
  const payment = req.body;
  payment.code = getCode();
  payment.grid = JSON.parse(JSON.stringify(grid));
  payments.push(payment);
  savePayments();
  res.json({ success: true });
});

app.get("/api/payments", (req, res) => {
  res.json(payments);
});

function savePayments() {
  fs.writeFileSync("payments.json", JSON.stringify(payments), "utf-8");
}

function loadPayments() {
  try {
    const data = fs.readFileSync("payments.json", "utf-8");
    payments = JSON.parse(data);
  } catch (error) {
    console.error("Error loading payments:", error.message);
  }
}

// Load payments on server start
loadPayments();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
