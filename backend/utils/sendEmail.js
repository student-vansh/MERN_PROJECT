const nodemailer = require("nodemailer");
const dns = require("dns");

// Force IPv4 resolution first, because Render.com's environment might attempt IPv6 
// which can result in ENETUNREACH errors when connecting to Gmail's SMTP servers.
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;