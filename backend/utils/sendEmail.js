const nodemailer = require("nodemailer");
console.log(process.env.EMAIL_USER);
console.log(!!process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true sirf port 465 ke liye
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Connected Successfully");
  }
});

module.exports = transporter;