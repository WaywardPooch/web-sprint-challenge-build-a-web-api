const Project = require("./projects-model");

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
};

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

module.exports = { handleError, validateProjectId };
