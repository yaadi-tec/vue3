const db = require("./../db/connect");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("./../errors");
const exportZIP = require("./excel");
const { Parser } = require("json2csv");
var jsonexport = require("jsonexport");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const { Blob } = require("buffer");
archiver.registerFormat("zip-encrypted", require("archiver-zip-encrypted"));
// Protected Route / Admin Only
// Get all TrasanctionList list    =>    POST /api/transaction/list
function getTransactionList(req, res) {
  const data = JSON.parse(req.body.data);
  try {
    db.getConnection(function(err, conn) {
      if (err) {
        db.reconnect("getAllProvider");
      } else {
        conn.query(
          `call stpGetTrasanctionLog_upgraded(?, ?, ?, ?, ?)`,
          [
            parseInt(data.OrgID),
            data.Type,
            data.ID || -1,
            data.FromDate,
            data.ToDate,
          ],
          function(err, rows) {
            conn.release(); // <-- must be here, AFTER you finished your query and before err handling
            if (err) {
              console.log(err);
              throw new CustomError.UnauthorizedError(err);
            } else {
              res.status(StatusCodes.OK).json(rows[0]);
            }
          }
        );
      }
    });
  } catch (error) {
    throw new CustomError.UnauthorizedError(error);
  }
}

function getDownloadCSV(req, res, next) {
  // const result = exportZIP(req.body.data);
  const { userJson, password } = JSON.parse(req.body.data);
  const columnHeader = ["Criterion", "Metric", "Status", "Count"];
  console.log(userJson, columnHeader, password);
  const json2csvParser = new Parser({ columnHeader });

  let d = [];
  let csvString = json2csvParser.parse(userJson);
  if (userJson.length > 0) {
    for (let i = 0; i < userJson.length; i++)
      d.push({
        Criterian: JSON.stringify(userJson[i].Criterian),
        Action: JSON.stringify(userJson[i].Action),
        Status: JSON.stringify(userJson[i].Status),
        Count: JSON.stringify(userJson[i].Count),
      });
  } else {
    d = [];
  }
  csvString = d;

  var dd = null;
  jsonexport(csvString, function(err, data) {
    if (err) return console.log(err);
    dd = data.replace(/""/g, "");
  });

  let stampValue = new Date().valueOf();
  let csvFilePath = path.resolve(`${__dirname}/file/Audit_${stampValue}.csv`);
  let zipFilePath = path.resolve(
    __dirname + "/file/Audit_" + stampValue + ".zip"
  );

  const archive = archiver("zip-encrypted", {
    zlib: { level: 8 },
    encryptionMethod: "aes256",
    password: password,
  });
  // create a file to stream archive data to.
  const output = fs.createWriteStream(zipFilePath);

  output.on("close", function() {
    fileSize = archive.pointer();
    console.log(archive.pointer() + " total bytes - " + zipFilePath);
    fs.readFile(zipFilePath, function(err, data) {
      if (err) {
        res.send(404);
      } else {
        res.setHeader("Content-Type", "application/octet-stream");
        res.end(data.toString("base64"));
      }
    });
    // res.send(output);
  });
  archive.pipe(output);
  archive.append(Buffer.from(dd), {
    name: "Audit_" + stampValue + ".csv",
  });
  archive.finalize();
}

module.exports = {
  getTransactionList,
  getDownloadCSV,
};
