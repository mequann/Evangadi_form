const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authenthication token ,Autherazition denied" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "token verfication failed ,authorization denied" });
    }
    req.id = verified.id;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = auth;
