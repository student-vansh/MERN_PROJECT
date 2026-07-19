const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/user");
const {
  checkEmailVerified,
  loginLimiter,
  forgotPasswordLimiter,
  resendVerificationLimiter,
  requireAuth,
} = require("../middleware");

// ye signup ke liye hai
router.post("/signup", UserController.signup);

//ye login ke liye hai
router.post(
  "/login",
  loginLimiter,
  checkEmailVerified,
  passport.authenticate("local"),
  UserController.login,
);

// logout
router.get("/logout", UserController.logout);

router.get("/my-downloads", requireAuth, UserController.getMyDownloads);

// 🔥 Example: admin only route
router.get("/admin", UserController.isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  UserController.forgotPassword,
);

router.post("/verify-otp", UserController.verifyOtp);
router.post("/resend-otp", forgotPasswordLimiter, UserController.resendOtp);
router.post("/reset-password", UserController.resetPassword);

//Verify Email ROute
router.get("/verify-email/:token", UserController.verifyEmail);

router.post(
  "/resend-verification",
  resendVerificationLimiter,
  UserController.resendVerificationEmail,
);

router.get("/me", UserController.getCurrentUser);

module.exports = router;

