const express = require("express");
const router = express.Router();

// Dashboard Route
router.get("/FOdashboard", (req, res) => {
	res.render("dashboards/FO-dashboard");
});

module.exports = router;
