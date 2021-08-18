
const jwt = require("jsonwebtoken");

class AuthService {}

  AuthService.createToken = async (user) => {
    try {
      console.log("Inside create token", user)
        return jwt.sign({
            // id: user._id,
            emailId: user.emailId
          },
          'secret', {
            expiresIn: '1h'
          }
        );
    } catch (err) {
      throw new Error(err)
    }
  };
  
  module.exports = AuthService;