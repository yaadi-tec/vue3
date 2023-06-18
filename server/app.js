/* eslint-disable no-console */
/*jshint esversion: 6 */
/*jshint node: true */
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require("dotenv").config();

// express
const express = require("express");
const app = express();

// packages
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
// db pool-connection
const { connect, reconnect, pool, getDataConfig } = require("./db/connect");
const { dataAccess } = require("./db/data-access");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// const { authenticateUser } = require("./middleware/authenticate");

var pkey = fs.readFileSync("./fixtures/oms-cloud.com.key", "utf8");
var cert = fs.readFileSync("./fixtures/oms-cloud.com.crt", "utf8");
var dad1 = fs.readFileSync("./fixtures/gd_bundle.crt", "utf8");
var dad2 = fs.readFileSync("./fixtures/gd_bundle.crt", "utf8");

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Creation of server
app.set("superSecret", process.env.SUPER_SECRET); // secret variable
app.set("sessionSecret", process.env.SESSION_SECRET); // secret variable
app.set("trust proxy", 1); // trust first proxy
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
const config = getDataConfig();
app.locals.db = dataAccess(config);

//middleware for cookies
app.use(cookieParser());

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));
// CORS
if (process.env.NODE_DEPLOYMENT === "DEV") {
  app.use(cors());

  // apiRoutes.get("/getcsrftoken", function (req, res) {
  //   var csrftoken = 'testcsrftoken';
  //   setResultStatus(res, 'getcsrftoken', 'success', '', {
  //     csrftoken: csrftoken
  //   });
  // });
} else {
  app.use(cors());

  //apiRoutes.use(csrf({ cookie: false }));
  // apiRoutes.get("/getcsrftoken", function (req, res) {
  //   var csrftoken = req.csrfToken();
  //   setResultStatus(res, 'getcsrftoken', 'success', '', {
  //     csrftoken: csrftoken
  //   });
  // });
}
//json error handling
app.use(function (error, request, response, next) {
  if (error) {
    console.error("json error", error);
    return response.json({
      Status: "Error",
      Message: "Error has occured! Please contact your administrator.",
    });
  }
  return next();
});

// app.use(process.env.NODE_API_PROD_URL, apiRoutes);
app.use(process.env.NODE_API_PROD_URL, express.static("dist"));
app.use(process.env.NODE_API_PROD_URL + "/api", require("./routes/index"));

// app.use(verifyJWT);
app.use(errorHandler);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

var server = https.createServer(
  {
    key: pkey,
    cert: cert,
    ca: [dad1, dad2],
  },
  app
);

//Lets start our server
server.timeout = 2 * 60 * 1000;
server.listen(
  process.env.NODE_SERVER_PORT,
  process.env.NODE_SERVER_IP,
  function () {
    //Callback triggered when server is successfully listening. Hurray!
    // connect("on server start");
    console.log(
      `Server ${process.env.NODE_SERVER_IP}:${process.env.NODE_SERVER_PORT} connected successfully`
    );
  }
);

process.on("uncaughtException", (error, origin) => {
  console.log("----- Uncaught exception -----");
  console.log(error);
  console.log("----- Exception origin -----");
  console.log(origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("----- Unhandled Rejection at -----");
  console.log(promise);
  console.log("----- Reason -----");
  console.log(reason);
});

//Audit log method.

function saveAuditLog(i_orgid, i_uid, i_userid, i_actionmessage) {
  // console.log("Inside saveAuditLog");
  var organizationid = i_orgid;
  var uid = i_uid;
  var userid = i_userid;
  var actiondescription = i_actionmessage;
  pool.getConnection(function (err, connection) {
    if (err) {
      reconnect("saveAuditLog");
    } else {
      connection.query(
        "CALL `stp_auditlog` (?,?,?,?)",
        [organizationid, uid, userid, actiondescription],
        function (error, rows, res) {
          connection.release(); // <-- must be here, AFTER you finished your query and before err handling
          if (error) {
            console.log("Error: ", error);
          } else {
            console.log("saveAuditLog", "success", actiondescription);
          }
        }
      );
    }
  });
}



