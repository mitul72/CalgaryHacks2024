// csvRouter.js
const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const router = express.Router();

// Cached data
let jsonData = null;

// Function to read and parse the CSV file into JSON
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Middleware to check cache
router.use((req, res, next) => {
  if (jsonData === null) {
    console.log("Parsing CSV as cache is empty...");
    const filePath = "./data/residential.csv"; // Update this path to your CSV file's location
    parseCSV(filePath)
      .then((data) => {
        jsonData = data;
        next();
      })
      .catch((error) => {
        console.error("Error parsing CSV file:", error);
        res.status(500).send("Failed to parse CSV file");
      });
  } else {
    console.log("Serving data from cache...");
    next();
  }
});

// GET endpoint to provide CSV data as JSON
router.get("/residential", (req, res) => {
  res.json(jsonData);
});

module.exports = router;
