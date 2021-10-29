// Imports
const express = require("express");
const Project = require("./projects-model");
const {
  validateProjectId,
  validateNewProject,
  validateUpdatedProject,
} = require("./projects-middleware");
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
    const targetProject = await Project.get(id);
    res.status(200).json(targetProject);
  } catch (err) {
    next(err);
  }
});
router.post("/", validateNewProject, async (req, res, next) => {
  try {
    const { name, description, completed = false } = req.body;
    const newProject = await Project.insert({
      name,
      description,
      completed,
    });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});
router.put(
  "/:id",
  validateProjectId,
  validateUpdatedProject,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, completed } = req.body;
      const updatedProject = await Project.update(id, {
        name,
        description,
        completed,
      });
      res.status(200).json(updatedProject);
    } catch (err) {
      next(err);
    }
  }
);
router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Project.remove(id);
    res.end(); // shoots back a response with no payload
  } catch (err) {
    next(err);
  }
});
router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetProject = await Project.get(id);
    res.status(200).json(targetProject.actions);
  } catch (err) {
    next(err);
  }
});

// Handle Errors When Needed
router.use(handleError);

// Exports
module.exports = router;
