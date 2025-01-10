const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let tasks = []; // In-memory storage for tasks

// Endpoint to retrieve tasks
app.get("/tasks", (req, res) => res.json(tasks));

// Endpoint to add a new task
app.post("/tasks", (req, res) => {
  tasks.push(req.body);
  res.status(201).json({ message: "Task added" });
});

// Endpoint to delete a task by index
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task, index) => index !== id);
  res.status(200).json({ message: "Task deleted" });
});

// Start the server on port 3000
app.listen(3000, () => console.log("Server running on port 3000"));
