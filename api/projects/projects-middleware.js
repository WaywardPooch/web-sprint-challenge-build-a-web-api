const Project = require("./projects-model");

const validateProjectId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetProject = await Project.get(id);
    if (targetProject) {
      next();
    } else {
      next({ status: 404, message: `Project with ID #${id} not found!` });
    }
  } catch (err) {
    next(err);
  }
};
const validateNewProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (name && description) {
      next();
    } else {
      next({
        status: 400,
        message: "New projects require a name and description",
      });
    }
  } catch (err) {
    next(err);
  }
};
const validateUpdatedProject = async (req, res, next) => {
  try {
    const { name, description, completed } = req.body;
    if (name && description && typeof completed === "boolean") {
      next();
    } else {
      next({
        status: 400,
        message:
          "Project updates require a name, description, and completed status",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateProjectId,
  validateNewProject,
  validateUpdatedProject,
};
