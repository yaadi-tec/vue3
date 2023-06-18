const express = require("express");
const router = express.Router();

const {
  patientMonitorIUD,
  getAuditList,
  getSecurityIncidentList,
  securityMonitorIUD,
} = require("./../controllers/auditController");

const { authenticateUser } = require("./../middleware/authenticate");

router.route("/patientmonitor").post(patientMonitorIUD);
router.route("/list").post(authenticateUser, getAuditList);
router.route("/securitylist").post(authenticateUser, getSecurityIncidentList);
router.route("/securitymonitoriud").post(authenticateUser, securityMonitorIUD);
module.exports = router;
