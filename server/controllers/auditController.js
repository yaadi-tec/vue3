const db = require("./../db/connect");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("./../errors");

// Protected Route / Admin Only
// Get audit log list     =>    POST /api/audit/list
function getAuditList(req, res) {
  const {
    orgid,
    usertype,
    userid,
    firstname,
    lastname,
    mrn,
    fromdate,
    todate,
    page,
    pageSize,
  } = JSON.parse(req.body.data);
  const limit = pageSize ? +pageSize : 100;
  const offset = page ? page * limit : 0;
  try {
    db.getConnection(function(err, conn) {
      if (err) {
        db.reconnect("getAuditList");
      } else {
        conn.query(
          `call stpGetAuditLog(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            orgid,
            parseInt(usertype),
            userid,
            firstname,
            lastname,
            mrn,
            fromdate,
            todate,
            limit,
            offset,
          ],
          function(err, rows) {
            conn.release(); // <-- must be here, AFTER you finished your query and before err handling
            if (err) {
              console.log(err);
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
              throw new CustomError.UnauthorizedError(err);
            } else {
              const result = {
                records: rows[0],
                totalCount: rows[1].length,
              };
              // const result = rows[0];
              res.status(StatusCodes.OK).json(result);
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
    throw new CustomError.UnauthorizedError(err);
  }
}

// Get Security Incident log list     =>    POST /api/securityincident/list
function getSecurityIncidentList(req, res) {
  const {
    orgid,
    usertype,
    userid,
    firstname,
    lastname,
    mrn,
    fromdate,
    todate,
  } = JSON.parse(req.body.data);
  try {
    db.getConnection(function(err, conn) {
      if (err) {
        db.reconnect("getAuditList");
      } else {
        conn.query(
          `call stpGetSecurityIncidentLog(?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            orgid,
            parseInt(usertype),
            userid,
            firstname,
            lastname,
            mrn,
            fromdate,
            todate,
          ],
          function(err, rows) {
            conn.release(); // <-- must be here, AFTER you finished your query and before err handling
            if (err) {
              console.log(err);
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
              throw new CustomError.UnauthorizedError(err);
            } else {
              const result = rows[0];
              res.status(StatusCodes.OK).json(result);
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
    throw new CustomError.UnauthorizedError(err);
  }
}

// Get Security Incident log list     =>    POST /api/securityincident/list
function patientMonitorIUD(req, res) {
  const {
    PatientMonitorID,
    PatientID,
    OrganizationID,
    StudyID,
    UserID,
    ProviderID,
    FacilityID,
    ReferenceID,
    ActionType,
    ActionModule,
    ActionComments,
    Status,
    ActionDate,
    IsActive,
    HIPAAAlertMessageId,
    HashValue,
    IsWeb,
    AdditionalDesc,
    QueryType,
  } = req.body;
  try {
    db.getConnection(function(err, conn) {
      if (err) {
        db.reconnect("patientMonitorIUD");
      } else {
        conn.query(
          `call stpAuditTrialPatientMonitorIUD(?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?)`,
          [
            PatientMonitorID,
            PatientID,
            OrganizationID,
            StudyID,
            UserID,
            ProviderID,
            FacilityID,
            ReferenceID,
            ActionType,
            ActionModule,
            ActionComments,
            Status,
            ActionDate,
            IsActive,
            HIPAAAlertMessageId,
            HashValue,
            IsWeb,
            AdditionalDesc,
            QueryType,
          ],
          function(err, rows) {
            conn.release(); // <-- must be here, AFTER you finished your query and before err handling
            if (err) {
              console.log(err);
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
              throw new CustomError.UnauthorizedError(err);
            } else {
              const result = rows[0];
              res.status(StatusCodes.OK).json(result);
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
    throw new CustomError.UnauthorizedError(err);
  }
}

// Get Security Incident log list     =>    POST /api/securityincident/list
function securityMonitorIUD(req, res) {
  const { orgid, userid } = JSON.parse(req.body.data);
  try {
    db.getConnection(function(err, conn) {
      if (err) {
        db.reconnect("securityMonitorIUD");
      } else {
        conn.query(
          `call stpSecurityMonitorIUD(?, ?)`,
          [orgid, userid],
          function(err, rows) {
            conn.release(); // <-- must be here, AFTER you finished your query and before err handling
            if (err) {
              console.log(err);
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
              throw new CustomError.UnauthorizedError(err);
            } else {
              const result = rows[0];
              res.status(StatusCodes.OK).json(result);
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
    throw new CustomError.UnauthorizedError(err);
  }
}

// securityMonitorIUD;

module.exports = {
  patientMonitorIUD,
  getAuditList,
  getSecurityIncidentList,
  securityMonitorIUD,
};
