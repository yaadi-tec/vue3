const CustomError = require("./../errors");

const authenticateUser = async (req, res, next) => {
  // check header
  // const authHeader = req.headers.authorization
  // if (!authHeader || !authHeader.startsWith('Bearer')) {
  //   throw new UnauthenticatedError('Authentication invalid')
  // }
  // const token = authHeader.split(' ')[1]

  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET)
  //   // attach the user to the job routes
  //   req.user = { userId: payload.userId, name: payload.name }
  //   next()
  // } catch (error) {
  //   throw new UnauthenticatedError('Authentication invalid')
  // }
  const authheader = req.headers.authorization;
  if (!authheader) {
    var err = {
      status: "error",
      statusMessage: "You are not authenticated!",
    };
    res.setHeader("WWW-Authenticate", "Basic");
    // res.send(err)
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  } else {
    try {
      var auth = new Buffer.from(authheader.split(" ")[1], "base64")
        .toString()
        .split(":");
      var user = auth[0];
      var pass = auth[1];
      if (user == "omsehr" && pass == "oms@Test1234") {
        next();
      }
    } catch (error) {
      throw new CustomError.UnauthenticatedError("Authentication invalid");
    }
  }
};
// authorizePermissions
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
