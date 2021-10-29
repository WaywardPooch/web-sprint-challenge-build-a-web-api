const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");

// Configure your server here
server.use(express.json());
// Build your projects router in /api/projects/projects-router.js
server.use("/api/projects", projectsRouter);
// Build your actions router in /api/actions/actions-router.js

// Do NOT `server.listen()` inside this file!
server.get("/", (req, res) => {
  res.send(`<h3>Hey! You made it!</h3>`);
});

module.exports = server;
