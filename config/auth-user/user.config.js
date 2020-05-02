require("dotenv").config();
const email = process.env.email;
const pass = process.env.pass;
module.exports = {
  USER: email,
  PASS: pass,
};
