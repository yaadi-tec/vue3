var express = require("express");
var router = express.Router();

const providerRoutes = require("./providerRoutes");
const auditRoutes = require("./auditRoutes");

router.use("/auditlog", auditRoutes);
router.use("/user", providerRoutes);

module.exports = router;
