const express = require("express");
const router = express.Router();

const {
  getTransactionList,
  getDownloadCSV,
} = require("./../controllers/transactionController");

const { authenticateUser } = require("./../middleware/authenticate");

router.route("/list").post(authenticateUser, getTransactionList);

router.route("/downloadcsv").post(authenticateUser, getDownloadCSV);

module.exports = router;
