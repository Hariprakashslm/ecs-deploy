const express = require("express");
const { register } = require("./metrics");
const { metricsMiddleware } = require("./metrics.middleware");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const { log } = require("./logger");
const app = express();
const cors = require("cors");
app.use(cors("*"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());
app.use(metricsMiddleware);

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
const users = [];
app.post("/user", (req, res) => {
  console.log(req.body);
  const user = {
    id: crypto.randomUUID(),
    ...req.body,
  };
  users.push(user);
  log("info", "User created", {
    userId: user.id,
  });
  res.send({ statusCode: 200 });
});

app.get("/users", (req, res) => {
  log("info", "User list");
  res.status(200).json(users);
});

module.exports = app;
