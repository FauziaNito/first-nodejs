const Validate = () => {
	var role = document.getElementById("role");
	var surname = document.getElementById("surname");
	var uniqueNumber = document.getElementById("uniquenumber");
	var password = document.getElementById("password");
	var ninNumber = document.getElementById("ninnumber");
	var password = document.getElementById("password");
	var confirmPassword = document.getElementById("confirmpassword");

	var roleError = document.getElementById("roleerr");
	var surnameError = document.getElementById("passworderr");
	var uniqueNumberError = document.getElementById("uniquenumbererr");
	var passwordError = document.getElementById("passworderr");
	var ninNumberError = document.getElementById("ninnumbererr");
	var passwordError = document.getElementById("passworderr");
	var confirmPasswordError = document.getElementById("confirmpassworderr");

	if (role.value == "") {
		role.style.border = "1px solid red";
		roleError.textContent = "Please Enter Farmer One Role";
		roleError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		return false;
	} else if (role.value == "selectrole") {
		role.style.border = "1px solid red";
		roleError.textContent = "Please Enter Farmer One Role";
		roleError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		return false;
	} else {
		role.style.border = "1px solid green";
		roleError.textContent = "";
	}

	const unregex = /^UF-([0-9]{3})+$/;

	if (uniqueNumber.value == "") {
		uniqueNumber.style.border = "1px solid red";
		uniqueNumberError.textContent = "Please Enter Farmer One Unique Number";
		uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		return false;
	} else if (!uniqueNumber.value.match(unregex)) {
		uniqueNumber.style.border = "1px solid red";
		uniqueNumberError.textContent = "Unique Number must follow UF-000 format";
		uniqueNumberError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		return false;
	} else {
		uniqueNumber.style.border = "1px solid green";
		uniqueNumberError.textContent = "";
	}

	if (password.value == "") {
		password.style.border = "1px solid red";
		passwordError.textContent = "Please Enter Farmer One Role";
		passwordError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		return false;
	} else if (password.value.length < 5) {
		password.style.border = "1px solid red";
		passwordError.textContent = "Please password must be altleast more than 5 Characters";
		passwordError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		return false;
	} else if (password.value.length > 15) {
		password.style.border = "1px solid red";
		passwordError.textContent = "Please password must be not be more than 15 Characters";
		passwordError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		return false;
	} else {
		password.style.border = "1px solid green";
		passwordError.textContent = "";
	}

	// Validating Confirm Password
	if (confirmPassword.value == "") {
		confirmPassword.style.border = "1px solid red";
		confirmPasswordError.textContent = "Please Re-Enter your password";
		confirmPasswordError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		return false;
	} else if (!(confirmPassword.value === password.value)) {
		confirmPassword.style.border = "1px solid red";
		confirmPasswordError.textContent = "Please confirm password doesn't match password";
		confirmPasswordError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
		return false;
	} else {
		confirmPassword.style.border = "1px solid green";
		confirmPasswordError.textContent = "";
	}
};


// //FarmerOne Role input validation
// 	if (farmerRole.value == "") {
// 		farmerRole.style.border = "1px solid red";
// 		farmerRoleError.textContent = "Please Enter Farmer One Role";
// 		farmerRoleError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
// 		return false;
// 	} else if (farmerRole.value == "selectrole") {
// 		farmerRole.style.border = "1px solid red";
// 		farmerRoleError.textContent = "Please Select Farmer One Role";
// 		farmerRoleError.style = "color:red; font-size:11px; font-family:Arial, Helvetica, Sans-serif";
// 		return false;
// 	} else {
// 		farmerRole.style.border = "1px solid green";
// 		farmerRoleError.textContent = "";
// 	}