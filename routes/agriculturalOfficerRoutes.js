const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Dashboard Route
// Incase of two people can access one page use || (or) in the if statement: if(req.user.role == "agriculturalofficer ||req.user.role == "farmerOne"")
router.get("/AOdashboard", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
	req.session.user = req.user;
	if (req.user.role == "agriculturalofficer") {
		res.render("dashboards/AO-dashboard");	
	}else{
		res.send("This page is for only agricultural Officers");
	}
});

module.exports = router;
