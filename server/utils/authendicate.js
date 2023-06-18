const CustomError = require('./../errors');

const authentication =  async (req, res, next) => {
    var authheader = req.headers.authorization;
    if (!authheader) {
      var err = {
        status:"error",
        statusMessage:'You are not authenticated!'
      };
      res.setHeader('WWW-Authenticate', 'Basic');
      res.send(err)
      throw new CustomError.UnauthenticatedError('Authentication invalid');
    } 
    try {
      var auth = new Buffer.from(authheader.split(' ')[1],'base64').toString().split(':');
      var user = auth[0];
      var pass = auth[1];
      if (user == 'omsehr' && pass == 'oms@Test1234') {
        next();
      }
    }
    catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
}

module.exports = {authentication};