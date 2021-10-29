const express = require("express");
const Action = require("./actions-model");
const {
  validateActionId,
  validateNewAction,
  validateUpdatedAction,
} = require("./actions-middleware");
const { handleError } = require("./../general-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", validateActionId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetAction = await Action.get(id);
    res.status(200).json(targetAction);
  } catch (err) {
    next(err);
  }
});
router.post("/", validateNewAction, async (req, res, next) => {
  try {
    const { completed = false } = req.body;
    const newAction = await Action.insert({ ...req.body, completed });
    res.status(201).json(newAction);
  } catch (err) {
    next(err);
  }
});
router.put(
  "/:id",
  validateActionId,
  validateUpdatedAction,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedAction = await Action.update(id, req.body);
      res.status(200).json(updatedAction);
    } catch (err) {
      next(err);
    }
  }
);
router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Action.remove(id);
    res.end();
  } catch (err) {
    next(err);
  }
});

router.use(handleError);
module.exports = router;
