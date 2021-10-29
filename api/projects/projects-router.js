// Imports
const express = require("express");
const Project = require("./projects-model");
const { validateProjectId, validateProject } = require("./projects-middleware");
const { handleError } = require("./../general-middleware");

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
router.get("/:id", validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.get(id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});
router.post("/", validateProject, async (req, res, next) => {
  try {
    const { name, description, completed } = req.body;
    const newProject = await Project.insert({
      name,
      description,
      completed: completed ? completed : false,
    });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

// Handle Errors When Needed
router.use(handleError);

// Exports
module.exports = router;
