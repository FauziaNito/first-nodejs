const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
	res.render("login");
});

// Login post route with out access restrictions
// router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
// 	req.session.user = req.user;
// 	console.log("This is the user", req.session);
// 	res.redirect("/uploadproduce");
// });

// Login post route with page access restrictions
router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
	req.session.user = req.user;
	console.log("This is the user", req.session);
	if (req.user.role == "agriculturalofficer") {
		res.redirect("/AOdashboard");
	}else if (req.user.role == "farmerOne") {
		res.redirect("/FOdashboard");
	}else if (req.user.role == "urbanfarmer") {
		res.redirect("/UFdashboard");
	}else {
		res.send('Your not a registered user in the system');
	}
});

// Logout route
router.post("/logout", (req, res) => {
	if (req.session) {
		req.session.destroy(function (err) {
			if (err) {
				res.status(400).send("Unable to logout,Please check your Internet connection");
			} else {
				return res.redirect("/login");
			}
		});
	}
});
module.exports = router;
