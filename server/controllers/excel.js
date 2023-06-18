const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

// archiver.registerFormat("zip-encrypted", require("archiver-zip-encrypted"));
const worksheetName = `Audit_Report`;
let stampValue,
  filePath,
  zipFileName = "";
let fileSize = 0;

async function generateExcel(userJson, columnHeader) {
  stampValue = new Date().valueOf();
  filePath = path.resolve(`${__dirname}/file/audittrail${stampValue}.xlsx`);
  zipFileName = path.resolve(`${__dirname}/file/Audit${stampValue}.zip`);
  const data = userJson.map((usr) => [usr.color, usr.value]);

  const workbook = XLSX.utils.book_new();
  const worksheetData = [columnHeader, ...data];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  XLSX.writeFile(workbook, filePath);
  return true;
}

async function createZIPFile(password) {
  const archiver = require("archiver");
  archiver.registerFormat("zip-encrypted", require("archiver-zip-encrypted"));
  const archive = archiver("zip-encrypted", {
    zlib: { level: 8 },
    encryptionMethod: "aes256",
    password: password,
  });

  const dataFile = fs.readFileSync(filePath);
  // create a file to stream archive data to.
  const output = fs.createWriteStream(zipFileName);
  output.on("close", function () {
    fileSize = archive.pointer();
    console.log(archive.pointer() + " total bytes - " + zipFileName);

    return output;
  });
  output.on("end", function () {
    console.log("Data has been drained");
  });
  archive.pipe(output);
  archive.append(Buffer.from(dataFile), { name: "audittrail.xlsx" });
  archive.finalize();
}

const DownloadCSV = async function (requestData) {
  const { userJson, columnHeader, password } = JSON.parse(requestData);
  const csv = await generateExcel(userJson, columnHeader);
  const zip = await createZIPFile(password);
  return new Promise((resolve, reject) => {
    resolve(zip).then((res) => {
      return res;
    });
  });
};

module.exports = DownloadCSV;
