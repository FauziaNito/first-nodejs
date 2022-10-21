const express = require("express");
const router = express.Router();
const multer = require("multer");
const connectEnsureLogin = require("connect-ensure-login");

// Importing Model
const Produce = require("../models/ProduceUpload");
const Registration = require("../models/User");

// image upload
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

// instantiate variable upload to store multer functionality to upload image
var upload = multer({ storage: storage });

// Produce form Route comes with all Urban farmers from the DB
// connectEnsureLogin.ensureLoggedIn()***Restricts page access,olny loggedon user can access a page
// router.get("/uploadproduce",connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
// 	const urbanFarmerList = await Registration.find({ role: "urbanfarmer" });
// 	console.log(urbanFarmerList);
// 	res.render("produce", { urbanfarmers: urbanFarmerList });
// });

// Route to get produce upload form with the loggedin user(UrbanFarmer)
router.get("/uploadproduce", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
	console.log("This is the Current User ", req.session.user);
	res.render("produce", { currentUser: req.session.user });
});

//produce upload route with images
router.post("/uploadproduce", connectEnsureLogin.ensureLoggedIn(), upload.single("uploadimage"), async (req, res) => {
	console.log(req.body);
	try {
		const produce = new Produce(req.body);
		produce.uploadimage = req.file.path;
		console.log("This is my produce", produce);
		await produce.save();
		res.redirect("/uploadproduce");
	} catch (error) {
		res.status(400).send("Can't save this image");
		console.log(error);
	}
});

// Getting List of Product from Database
router.get("/producelist", async (req, res) => {
	try {
		// const order = {_id:-1}
		let products = await Produce.find().sort({ $natural: -1 }); //To sort the current product
		res.render("produce-list", { products: products });
	} catch (error) {
		res.status(400).send("Unable to get Produce list");
	}
});


// Updating Produce
// Update get route for a particular id
router.get("/produce/update/:id", async (req, res) => {
	try {
		const updateProduct = await Produce.findOne({ _id: req.params.id });
		res.render("produce-update", { product: updateProduct });
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});
// Update post route
router.post("/produce/update", async (req, res) => {
	try {
		await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/producelist");
	} catch (error) {
		res.status(400).send("Unable to update produce");
	}
});

//delete Route
router.post("/produce/delete", async (req, res) => {
	try {
		await Produce.deleteOne({ _id: req.body.id }); //Note Produce should be your collection name
		res.redirect("/producelist");
	} catch (error) {
		res.status(400).send("back"); //back helps you to stay on the same route
	}
});

// Dashboard Route
router.get("/UFdashboard", (req, res) => {
	res.render("dashboards/UF-dashboard");
});

module.exports = router;
