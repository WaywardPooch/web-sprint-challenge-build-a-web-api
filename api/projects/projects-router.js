// Imports
const express = require("express");
const Project = require("./projects-model");
const { handleError } = require("./projects-middleware");

// Router Declaration
const router = express.Router();

// Endpoints starting with /api/projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

// Handle Errors When Needed
router.use(handleError);

// Exports
module.exports = router;
