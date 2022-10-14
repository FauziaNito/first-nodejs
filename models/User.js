const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');// Helps in Authentication of user login details

const userSchema = new mongoose.Schema({
	surname: {
		type: String,
		trim: true,
	},
	ninnumber: {
		type: String,
		required: true,
		trim: true,
	},
	raddress: {
		type: String,
		required: true,
	},
	ward: {
		type: String,
		required: true,
		trim: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	residenttype: {
		type: String,
		required: true,
	},
	phonenumber: {
		type: Number,
		required: true,
		trim: true,
	},
	pos: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	uniquenumber: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: "uniquenumber",
});
module.exports = mongoose.model("Registration", userSchema);
// Registration is the collection- name of the table