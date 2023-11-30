
// server.js
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const PORT = 3000;
app.use(express.json());
app.use(cors());

const stocksRouter = require("./routes/stocks");

// Use the items router for requests to /items
app.use("/api/stocks", stocksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
