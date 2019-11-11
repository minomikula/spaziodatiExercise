const { verify, getJWT } = require("./auth");

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();

const port = 8000;

const jwtHeader = "X-jwt";

app.listen(port, () => {
  console.log("Server started!");
});

// setup interceptors
app.use(express.static("client/dist/spaziodatiExercise"));

app.use(bodyParser.json());

app.route("/api/login").post((req, res, next) => {
  setTimeout(() => {
    handleLogin(req, res, next);
  }, getRandomDelay());
});

app.route("/api/data/*").get((req, res, next) => {
  const jwt = req.header(jwtHeader);
  const isAuthentificated = verify(jwt);
  if (!isAuthentificated) {
    res.sendStatus(401);
    return;
  }
  next();
});

app.route("/api/data/secret").get((req, res) => {
  return res.status(200).send({ serverData: "this is only for logged users" });
});

// TODO dont redirect angular pages

app.get("*", function(req, res) {
  res.redirect("/");
});

function handleLogin(req, res) {
  const credential = {
    login: req.body.login,
    password: req.body.password
  };
  const newToken = getJWT(credential);
  if (!newToken) {
    console.log(`user ${credential.login} failed to log in`);
    res.status(401).send({
      status: false,
      errorMessage: "Incorect login or password"
    });
  } else {
    console.log(`user ${credential.login} logged in`);
    res.status(200).send({
      status: true,
      token: newToken
    });
  }
}

function getRandomDelay() {
  const min = 3000;
  const max = 4000;
  return _.random(min, max, true);
}
