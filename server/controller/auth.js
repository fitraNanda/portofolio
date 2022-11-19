import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../helper/nodemailer.js";

export const register = (req, res) => {
  // check user if exist

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).send(err);

    if (data.length) return res.status(409).json("User already exist!");
    //if not create a new user
    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`,`email`,`password`,`name`,`coverPic`,`profilePic`) VALUE (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
      req.body.coverPic,
      req.body.profilePic,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        // return res.status(200).json(data);

        ///////////////////////////
        const createToken = (payload) => {
          return jwt.sign(payload, "private123", {
            expiresIn: "12h",
          });
        };

        let { username, email, name } = req.body;
        let id = data.insertId;

        let token = createToken({ id, username, email, name });

        let mail = {
          from: "Admin <bagginsbilbo038@gmail.com>",
          to: `${req.body.email}`,
          subject: "Account verification",
          html: `<a href="http://localhost:3000/authentication/${token}">Click here For verification</a>`,
        };

        transporter.sendMail(mail, (errMail, resMail) => {
          if (errMail) {
            console.log(errMail);

            res.status(500).send({
              message: "Registration failed",
              success: false,
              err: errMail,
            });
          }

          res.status(200).send({
            message: "Registration success",
            success: true,
          });
        });
      }
    });
  });
};

export const login = (req, res) => {
  //check our users

  //if no send error

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("User not Found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logout");
};

export const verification = (req, res) => {
  let updateQuery = `update users set status = 'verified' where id = ${req.user.id}`;
  db.query(updateQuery, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).send({ message: "verified account", success: true });
  });
};
