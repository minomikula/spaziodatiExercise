const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.listen(8000, () => {
  console.log("Server started!");
});

app.use(bodyParser.json());

app.route("/api/login").post((req, res, next) => {
  const newToken = getJWT(req.body.login, req.body.password);
  if (!newToken) {
    res.sendStatus(401);
  } else {
    res.sendStatus(200).send(newToken);
  }
  return setTimeout(next, getRandomDelay());
});

function getJWT(login, password) {
  const user = findUser(login);
  if (!user) {
    return null;
  }
  return issiueJWT(user);
}

function issiueJWT(user) {
  return "mock-token";
}

function findUser(login) {
  const mockedDBUserList = [
    { login: "a@a", password: "a" },
    { login: "example@example.com", password: "password" }
  ];
  return mockedDBUserList.find(user => user.login === login);
}

function getRandomDelay() {
  const min = 3000;
  const max = 4000;
  return _.random(min, max, true);
}
