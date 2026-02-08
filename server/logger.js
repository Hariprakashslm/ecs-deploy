function log(level, message, meta = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    service: "backend-api",
    environment: process.env.NODE_ENV,
    ...meta,
  };

  console.log(JSON.stringify(logEntry));
}

module.exports = { log };
