const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//: Render a list of all humans for the current user.

router.get('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Render index.ejs, passing in all of the current user's 
      res.render('humans/index.ejs', {
        humans: currentUser.humans,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/new', async (req, res) => {
    res.render('humans/new.ejs');
  });

router.get('/:humanId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);

      const human = currentUser.humans.id(req.params.humanId);
      res.render('humans/show.ejs', {
        human: human,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

router.get('/:humanId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const human = currentUser.humans.id(req.params.humanId);
      res.render('humans/edit.ejs', {
        human: human,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
router.post('/', async (req, res) => {
    try {
       const currentUser = await User.findById(req.session.user._id);
 
      currentUser.humans.push(req.body);
      await currentUser.save();

      res.redirect(`/users/${currentUser._id}/humans`);
   
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
router.delete('/:humanId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.humans.id(req.params.humanId).deleteOne();
      // Save changes to the user
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/humans`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

router.put('/:humanId', async (req, res) => { 
    try {
      // Find the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      const human = currentUser.humans.id(req.params.humanId);

      human.set(req.body);
      // Save the current user
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/humans/${req.params.humanId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  

  
module.exports = router;
