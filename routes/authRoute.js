const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
	res.render("login");
});
// Login route

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
	req.session.user = req.user;
	console.log("This is the user", req.session);
	res.redirect("/uploadproduce");
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
