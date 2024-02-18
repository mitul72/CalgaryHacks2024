// csvRouter.js
import express from "express";
import fs from "fs";
import csv from "csv-parser";
import { Router } from "express";

// Cached data
let jsonData = null;
let router = Router();

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
const extractCoordinates = (multilinestring, address) => {
  const regex = /\(([^)]+)\)/g;
  const coordinates = [];
  let match;
  while ((match = regex.exec(multilinestring)) !== null) {
    let coord = match[1].split(",")[1];
    const [lng, lat] = coord.trim().split(" ");
    const parsedLng = parseFloat(lng);
    const parsedLat = parseFloat(lat);
    if (!isNaN(parsedLng) && !isNaN(parsedLat)) {
      coordinates.push({
        coords: [parsedLng, parsedLat],
        address: address,
        type: "residential",
        hourly_price: "$5.50",
        timings: "12 - 1 PM",
        shown: true,
        description: "public parking",
      });
    }
  }
  return coordinates;
};
let coords = null;
// Middleware to check cache
// Middleware to check cache
router.use((req, res, next) => {
  if (jsonData === null) {
    console.log("Parsing CSV as cache is empty...");
    const filePath = "./data/residential.csv"; // Update this path to your CSV file's location
    parseCSV(filePath)
      .then((data) => {
        jsonData = data;
        // Initialize coords as an empty array to store coordinates from all items
        coords = [];
        data.forEach((item) => {
          const lineString = item.line; // Extract the MULTILINESTRING value
          const address = item.ADDRESS_DESC;
          const itemCoords = extractCoordinates(lineString, address);
          //   console.log(itemCoords); // Use or log the extracted coordinates
          // Append extracted coordinates for this item to the overall coords array
          coords.push(...itemCoords);
        });
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

router.get("/coords", (req, res) => {
  //   console.log(coords);
  res.json(coords);
});

export default router;
