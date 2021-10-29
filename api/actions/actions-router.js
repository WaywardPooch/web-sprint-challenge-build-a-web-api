const express = require("express");
const Action = require("./actions-model");
const { validateActionId } = require("./actions-middleware");
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
router.post("/", async (req, res, next) => {});
router.put("/:id", async (req, res, next) => {});
router.delete("/:id", async (req, res, next) => {});

router.use(handleError);
module.exports = router;
