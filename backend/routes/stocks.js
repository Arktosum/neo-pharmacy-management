// routes/items.js

const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");

const dataFilePath = path.join(__dirname, "../databases/stock-data.json");

async function readData() {
  try {
    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return {};
  }
}
async function writeData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

// Get all items
router.get("/", async (req, res) => {
  const items = await readData();
  res.json(items);
});

// Get an item by ID
router.get("/:id", async (req, res) => {
  const items = await readData();
  const itemId = req.params.id;
  const item = items[itemId];
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

// Create a new item
router.post("/", async (req, res) => {
  const items = await readData();
  const newItem = req.body;

  if (!newItem) {
    return res.status(400).json({ error: "Invalid request" });
  }
  const itemId = Date.now().toString();
  newItem.id = itemId;
  items[itemId] = newItem;
  await writeData(items);

  res.status(201).json(newItem);
});

// Update an existing item
router.put("/", async (req, res) => {
  const items = await readData();
  const updatedItem = req.body;
  const id = updatedItem.id
  // Check if the item exists
  if (!items[id]) {
    return res.status(404).json({ error: "Item not found" });
  }

  // Update the item
  items[id] = { ...items[id], ...updatedItem };

  // Write the updated data to the JSON file
  await writeData(items);

  res.json(items[id]);
});

// Delete an item
router.delete("/:id", async (req, res) => {
  const items = await readData();
  const itemId = req.params.id;

  if (!items[itemId]) {
    return res.status(404).json({ error: "Item not found" });
  }
  delete items[itemId];
  await writeData(items);

  res.json({ id:itemId });
});

module.exports = router;
