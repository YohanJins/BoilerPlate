const {User}  = require('../models/User');

function auth(req, res, next) {
  // Get token from cookie
  const token = req.cookies.x_auth;

  // Decrypt token and retrieve user
  User.findByToken(token)
  .then((user) => {
      if (!user) {
          throw new Error("유효하지 않은 토큰입니다.");
      }

      // Deliver token and user information to the next
      req.token = token;
      req.user = user;
      return next();
  })
  .catch((err) => {
      return res.status(401).json({
          isAuth: false,
          message: err.message
      });
  })
}



module.exports = {auth};