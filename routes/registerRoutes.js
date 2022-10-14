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
        await Registration.register(user, req.body.password, (error) =>{
            if(error){
                throw error;
            }
            res.redirect('/register')
        });
    } catch (error) {
        res.status(400).send('Sorry, it seems there is trouble accessing this page');
        console.log(error);
    }
});


// Export this file in the server file, for it to be read(executed)
module.exports = router;