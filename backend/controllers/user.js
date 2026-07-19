const User = require("../models/user.js");
const Download = require("../models/download.js");
const Otp = require("../models/otp.js");
const transporter = require("../utils/sendEmail.js");
const sendVerificationEmail = require("../utils/sendVerificationEmail.js");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
//for register
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser = new User({
      name,
      email,
      role: role === "admin" ? "admin" : "user",
      verificationToken,
    });
    console.log(newUser);
    const registeredUser = await User.register(newUser, password);
    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: registeredUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// for login
module.exports.login = (req, res) => {
  res.json({
    success: true,
    message: "Login successful",
    user: req.user,
  });
};

// for logout
module.exports.logout = (req, res) => {
  req.logout(() => {
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  });
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Admin access only",
  });
};

// downloads

module.exports.getMyDownloads = async (req, res) => {
  try {
    const downloads = await Download.find({
      user: req.user._id,
    }).populate("note");

    res.json({
      success: true,
      downloads,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching downloads",
    });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // We'll continue here...
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    await Otp.deleteMany({ email });

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Password Reset Request</h2>

      <p>Hello,</p>

      <p>Your OTP for password reset is:</p>

      <h1 style="letter-spacing:5px;color:#0d6efd;">
        ${otp}
      </h1>

      <p>This OTP will expire in <b>5 minutes</b>.</p>

      <p>If you didn't request this, simply ignore this email.</p>

      <hr>

      <small>Exam Notes Team</small>
    </div>
  `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "OTP not found. Please request a new one.",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otp);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    // Delete used OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    // Issue a short-lived reset token so /reset-password is protected
    const resetToken = crypto.randomBytes(32).toString("hex");
    const user = await User.findOne({ email });
    if (user) {
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetToken, // send to client, client passes it on reset
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;

    if (!email || !newPassword || !resetToken) {
      return res.status(400).json({
        success: false,
        message: "Email, reset token, and new password are required",
      });
    }

    const user = await User.findOne({
      email,
      resetPasswordToken: resetToken,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token. Please start over.",
      });
    }

    if (user.resetPasswordExpires < new Date()) {
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      return res.status(400).json({
        success: false,
        message: "Reset session expired. Please verify OTP again.",
      });
    }

    // Set the new password
    await user.setPassword(newPassword);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// Verify Email

module.exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link",
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;

    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    return res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // remove previous OTPs
    await Otp.deleteMany({ email });

    // generate new numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Actually send the OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP (Resent)",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Password Reset OTP</h2>
          <p>Hello,</p>
          <p>Your new OTP for password reset is:</p>
          <h1 style="letter-spacing:5px;color:#0d6efd;">${otp}</h1>
          <p>This OTP will expire in <b>10 minutes</b>.</p>
          <p>If you didn't request this, simply ignore this email.</p>
          <hr>
          <small>Notes Free Team</small>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports.getCurrentUser = (req, res) => {
  console.log(req.user);
  console.log(req.isAuthenticated());

  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  return res.status(200).json({
    success: true,
    user: req.user,
  });
};
// Goggle AUth
