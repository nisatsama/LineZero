const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const { getAnalytics } = require("../controllers/analyticsController");

router.get("/report", auth, getAnalyticsReport);

module.exports = router;
