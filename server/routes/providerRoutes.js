const express = require("express");
const router = express.Router();

const {
  getAllProvider,
  testapi,
  getuser,
} = require("./../controllers/providerController");

const {
  authenticateUser,
  authorizeRoles,
} = require("./../middleware/authenticate");

router.route("/test").get(testapi);

router.route("/getuser").get(getuser);

router.route("/list").get(authenticateUser, getAllProvider);

module.exports = router;
