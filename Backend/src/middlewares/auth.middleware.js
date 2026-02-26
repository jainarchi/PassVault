const jwt = require("jsonwebtoken");


async function identifyUser(req, res, next) {
  const token = req.cookies.token;


  if (!token) {
    return res.status(404).json({
      message: "token not provided, unauthorized",
    });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next()

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });

  }
}

module.exports = identifyUser;
