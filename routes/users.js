const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

router.post('/register', catchAsync(users.register));

router.post('/login', users.login);

router.get('/renewToken', catchAsync(users.renewToken));

router.get('/logout', users.logout);

module.exports = router;