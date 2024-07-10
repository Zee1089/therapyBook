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

module.exports = router;

