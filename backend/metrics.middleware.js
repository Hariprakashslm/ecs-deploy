const { httpRequestCounter, httpRequestDuration } = require("./metrics");

function metricsMiddleware(req, res, next) {
  const end = httpRequestDuration.startTimer({
    method: req.method,
    route: req.route?.path || req.path,
  });

  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });
    end();
  });

  next();
}

module.exports = { metricsMiddleware };
