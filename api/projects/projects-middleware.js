// const Project = require("./projects-model");

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
};

module.exports = { handleError };
