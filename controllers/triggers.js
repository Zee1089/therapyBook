const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        res.render('triggers/index.ejs');
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    
});

router.get('/new', async (req, res) => {
    res.render('triggers/new.ejs');
});

router.post('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      currentUser.triggers.push(req.body);
      // Save changes to the user
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/triggers`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/')
    }
  });
  
module.exports = router;

