const db = require("./../db/connect");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("./../errors");
const path = require("path");

// Public Route
// test api   =>    GET /api/provider/testapi

const testapi = async (req, res) => {
  res.send("api working!");
};

const getuser = async (req, res) => {
  try {
    const command = `Select UserId, Fullname, OrganizationID, Role from [OMS-CS].dbo.Users`;
    const result = (await req.app.locals.db.query(command)).recordset;
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Protected Route / Admin Only
// Get all provider list    =>    POST /api/provider/list
function getAllProvider(req, res) {
  const orgid = req.query.orgid;
  try {
    db.getConnection(function (err, conn) {
      if (err) {
        db.reconnect("getAllProvider");
      } else {
        conn.query(
          `SELECT * FROM provider where OrganizationID = ${orgid}`,
          function (err, rows) {
            conn.release(); // <-- must be here, AFTER you finished your query and before err handling
            if (err) {
              console.log(err);
              throw new CustomError.UnauthorizedError(err);
            } else {
              res.status(StatusCodes.OK).json(rows);
            }
          }
        );
      }
    });
  } catch (error) {
    throw new CustomError.UnauthorizedError(error);
  }
}

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image smaller 1MB");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  testapi,
  getuser,
  getAllProvider,
  uploadImage,
};
