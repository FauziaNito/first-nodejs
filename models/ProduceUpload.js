const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	producename: {
		type: String,
		trim: true,
		required: true,
	},
	ward: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Registration",
	},
	dor: {
		type: Date,
		trim: true,
	},
	price: {
		type: Number,
		trim: true,
	},
	quantity: {
		type: Number,
		trim: true,
		required: true,
	},
	modeofdelivery: {
		type: String,
		trim: true,
	},
	modeofpayment: {
		type: String,
		trim: true,
	},
	farmername: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Registration", //Creating a relationship btn farmers in Registration collection & produce
	},
	uploadimage: {
		type: String,
	},
	status: {
		type: String,
		default: "Pending",
		enum: ["Pending", "Approved"],
	},
	availability: { //
		type: String,
		default: "available",
		enum: ["available", "booked", "N/A"],
	},
});

module.exports = mongoose.model("Produce", userSchema);
