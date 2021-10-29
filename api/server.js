// Imports
const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");
const { logger } = require("./general-middleware");

// Middleware
server.use(express.json());
server.use(logger);
server.use("/api/projects", projectsRouter);

// Default response
server.get("/", (req, res) => {
  res.send(`<h3>Hey! You made it!</h3>`);
});

// Exports
module.exports = server;
