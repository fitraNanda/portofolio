import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, "private123", (err, decode) => {
    if (err) {
      return res.status(401).send(err);
    }
    req.user = decode;

    next();
  });
};

export default auth;
