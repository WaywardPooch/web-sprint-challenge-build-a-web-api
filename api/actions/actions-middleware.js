const Action = require("./actions-model");

const validateActionId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetAction = await Action.get(id);
    if (targetAction) {
      next();
    } else {
      res.status(404).json({ message: `Action with ID #${id} not found!` });
    }
  } catch (err) {
    next(err);
  }
};
const validateNewAction = (req, res, next) => {
  try {
    const { project_id, description, notes, completed = false } = req.body;
    if (project_id && description && notes) {
      if (typeof completed === "boolean") {
        next();
      } else {
        res
          .status(400)
          .json({ message: "The value of 'completed' must be a boolean" });
      }
    } else {
      res
        .status(400)
        .json({
          message: "New actions require project_id, description, and notes",
        });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { validateActionId, validateNewAction };
