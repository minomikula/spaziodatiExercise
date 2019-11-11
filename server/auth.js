const _ = require("lodash");
const jwt = require("jsonwebtoken");

const jwtSecret = "Secret stored in server";

function getJWT(credential) {
  const user = findUser(credential);
  if (!user) {
    return null;
  }
  return issiueJWT(user);
}
exports.getJWT = getJWT;
function issiueJWT(user) {
  return jwt.sign(user.id, jwtSecret);
  // return "mock-token";
}
// used to verify if user is logged
function verify(token) {
  return jwt.verify(token, jwtSecret);
}
exports.verify = verify;
function findUser(credential) {
  // should store salted hashes
  const mockedDBUserList = [
    { id: 1, login: "a@a", password: "a" },
    { id: 2, login: "example@example.com", password: "password" }
  ];
  return _.find(mockedDBUserList, credential);
}
