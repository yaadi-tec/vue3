var crypto = require("crypto");
require("dotenv").config();
var inetp = "192.168.10.1:8000";
console.log("length: ", inetp.length);
const iv = Buffer.from(
  process.env.ED_EI.substring(inetp.length),
  "base64"
).toString("utf8");
const key = Buffer.from(
  process.env.ED_EK.substring(inetp.length),
  "base64"
).toString("utf8");

function encrypt(text) {
  var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  var enc = cipher.update(text, "utf8", "base64");
  enc += cipher.final("base64");
  return enc;
}

function decrypt(text) {
  var decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  var dec = decipher.update(text, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

console.log(encrypt("omsservice")); // db username
console.log(encrypt("PrJaEmRrrmfaAxlUiUbxiR7nge3VVIg6yHIEIt4nTwQ=")); // db password
