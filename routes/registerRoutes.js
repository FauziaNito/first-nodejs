const express = require('express');
const router = express.Router();

// Importing Model
const Registration = require('../models/User');

router.get('/register', (req, res) => {
    res.render('signup');
});

router.post('/register', async (req, res) =>{
    console.log(req.body);
    try {
        const user = new Registration(req.body);
        let uniqueExist = await Registration.findOne({uniquenumber:req.body.uniquenumber});
        let ninNumberExist = await Registration.findOne({ ninnumber: req.body.ninnumber });
        if (uniqueExist) {
            return res.status(400).send("Sorry this Number is already taken");
		} else if (ninNumberExist) {
            return res.status(400).send("Sorry this NIN Number is already taken");
		} else {
			await Registration.register(user, req.body.password, (error) => {
				if (error) {
					throw error;
				}
				res.redirect("/register");
			});
		}
        
    } catch (error) {
        res.status(400).send('Sorry, it seems there is trouble accessing this page');
        console.log(error);
    }
});

router.get("/FarmerOneList", async (req, res) => {
    try {
        let farmerones = await Registration.find({ role: "farmerOne" });
        res.render("FOList", {farmerones:farmerones});
    } catch (error) {
        res.status(400).send("Unable to find Farmer Ones in the Database");
		console.log(error);
    }
	
});

// Export this file in the server file, for it to be read(executed)
module.exports = router;