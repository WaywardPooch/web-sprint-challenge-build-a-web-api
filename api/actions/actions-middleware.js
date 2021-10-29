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

module.exports = { validateActionId };
