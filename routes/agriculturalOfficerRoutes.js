const express = require("express");
const router = express.Router();

// Dashboard Route
router.get("/AOdashboard", (req, res) => {
	res.render("dashboards/AO-dashboard");
});

module.exports = router;
