const { User } = require("./../model/user.model");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;
    console.log(req.headers.authorization);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "You are not logged in!",
      });
    }

    try {
      const decoded = jwt.verify(token, "secret");
      const user = await User.findById(decoded._id);
      req.user = user;
      return next();
    } catch (error) {
      console.log("error: ", error);
      return res.status(401).json({
        message: "You are not logged in!",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};


module.exports = { protect };