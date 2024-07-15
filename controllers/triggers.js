const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//: Render a list of all triggers for the current user.

router.get('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Render index.ejs, passing in all of the current user's 
      res.render('triggers/index.ejs', {
        triggers: currentUser.triggers,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/new', async (req, res) => {
    res.render('triggers/new.ejs');
  });

router.get('/:triggerId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);

      const trigger = currentUser.triggers.id(req.params.triggerId);
      res.render('triggers/show.ejs', {
        trigger: trigger,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

router.get('/:triggerId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const trigger = currentUser.triggers.id(req.params.triggerId);
      res.render('triggers/edit.ejs', {
        trigger: trigger,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
router.post('/', async (req, res) => {
    try {
       const currentUser = await User.findById(req.session.user._id);
 
      currentUser.triggers.push(req.body);
      await currentUser.save();

      res.redirect(`/users/${currentUser._id}/triggers`);
   
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
router.delete('/:triggerId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.triggers.id(req.params.triggerId).deleteOne();
      // Save changes to the user
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/triggers`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

router.put('/:triggerId', async (req, res) => { 
    try {
      // Find the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      const trigger = currentUser.triggers.id(req.params.triggerId);

      trigger.set(req.body);
      // Save the current user
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/triggers/${req.params.triggerId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  

  
module.exports = router;
