import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bagginsbilbo938@gmail.com",
    pass: "abklbyvtqnpmyury",
  },

  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
