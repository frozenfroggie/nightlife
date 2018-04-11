const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = require('../middleware/authenticate');

router.get('/google', authenticate, passport.authorize('google', { scope: ['profile', 'email'] }));

router.get('/facebook', authenticate, passport.authorize('facebook', { scope: ['email'] }));

router.get('/github', authenticate, passport.authorize('github'));

module.exports = router;
