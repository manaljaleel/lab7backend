const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API route to fetch projects
app.get("/api/projects", (req, res) => {
  fs.readFile("projects.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading projects file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const projects = JSON.parse(data);

      // Check if projects exist
      if (!projects || projects.length === 0) {
        return res.status(404).json({ error: "No projects found" });
      }

      res.json(projects);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// 404 Route Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
