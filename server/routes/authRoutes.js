const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, me);
// Protected route
router.get("/dashboard", protect, (req, res) => {
  res.json({
    success: true,
    userId: req.user.id,
  });
});

module.exports = router;
