const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.listen(8000, () => {
  console.log("Server started!");
});

// setup interceptors
app.use(bodyParser.json());
app.use((req, res, next) => setTimeout(next, getRandomDelay()));

app.route("/api/login").post((req, res) => {
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
});

function getJWT(credential) {
  const user = findUser(credential);
  if (!user) {
    return null;
  }
  return issiueJWT(user);
}

function issiueJWT(user) {
  return "mock-token";
}

function findUser(credential) {
  // should store salted hashes here
  const mockedDBUserList = [
    { login: "a@a", password: "a" },
    { login: "example@example.com", password: "password" }
  ];
  return _.find(mockedDBUserList, credential);
}

function getRandomDelay() {
  const min = 3000;
  const max = 4000;
  return _.random(min, max, true);
}
