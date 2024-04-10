const jwt = require("jsonwebtoken");

const makeRandom = (length) => {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghtreeeds4353212ijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

const makeRandomOTP = (length) => {
  var result = [];
  var characters = "1234567890034546278294845432678";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

const generateAccessToken = (user) => {
  const userObject = user.toObject();

  return jwt.sign(userObject, process.env.JWT_SECRET, {
    expiresIn: "2 days",
  });
};

/*  Authentication Middleware  */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const Token = authHeader && authHeader.split(" ")[1];

  if (Token == null) return res.sendStatus(401);
  console.log("Received Token:", Token);

  jwt.verify(Token, process.env.JWT_SECRET, (err, user) => {
    console.error("Token Verification Error:", err);

    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

module.exports = {
  makeRandom,
  generateAccessToken,
  authenticateToken,
  makeRandomOTP,
};
