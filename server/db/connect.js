require("dotenv").config();
const decrypt = require("../utils/decrypt");

var serverip = "";
var secret = "";
var username = "";

if (process.env.VUE_APP_DEPLOYMENT === "PROD") {
  serverip = process.env.NODE_MSSQL_PROD_IP;
  secret = decrypt(process.env.NODE_MSSQL_PROD_SECRET);
  username = decrypt(process.env.NODE_MSSQL_PROD_USERNAME);
} else if (process.env.VUE_APP_DEPLOYMENT === "TEST") {
  serverip = process.env.NODE_MSSQL_PROD_IP;
  secret = decrypt(process.env.NODE_MSSQL_PROD_SECRET);
  username = decrypt(process.env.NODE_MSSQL_PROD_USERNAME);
} else {
  serverip = process.env.NODE_MSSQL_DEV_IP;
  secret = decrypt(process.env.NODE_MSSQL_DEV_SECRET);
  username = decrypt(process.env.NODE_MSSQL_DEV_USERNAME);
}

var dbconfig = {
  user: username,
  password: secret,
  server: serverip,
  database: process.env.NODE_MSSQL_DB,
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  requestTimeout: 30000,
  connectionTimeout: 30000,
  dialectOptions: {
    options: {
      connectionTimeout: 30000,
      requestTimeout: 30000,
    },
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const getDataConfig = () => ({
  name: "OMS-DB",
  config: dbconfig,
});

module.exports = {
  getDataConfig,
};
