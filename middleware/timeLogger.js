const timeLogger = (req, res, next) => {
  console.log(req.method, " Time:", Date.now());
  next();
};

module.exports = timeLogger;