const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getAnalytics } = require("../controllers/analyticsController");

router.get("/report", auth, getAnalytics);

module.exports = router;
