const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authorize('google', { scope: ['profile', 'email'] }));

router.get('/facebook', passport.authorize('facebook', { scope: ['email'] }));

router.get('/github', passport.authorize('github'));

module.exports = router;
