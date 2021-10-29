// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
};

const logger = (req, res, next) => {
  const time = new Date().toUTCString();
  console.log(`
    METHOD: ${req.method}
    URL:    ${req.originalUrl}
    FROM:   ${req.ip}
    TIME:   ${time}
  `);
  next();
};

module.exports = { handleError, logger };
