const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const User = require('../models/user');
const pick = require('lodash/pick');
const moment = require('moment');

//identification if user exists
router.get('/search/:identifier', function(req, res) {
  User.checkUserExists(req.params.identifier)
      .then(isUserExists => res.send({isUserExists}))
      .catch(err => console.log(err));
});

//signup
router.post('/', function(req, res) {
  const body = pick(req.body, ['username', 'email', 'firstName', 'lastName', 'password']);
  const user = new User(body);
  user.save()
      .then(() => user.generateAndSaveTokens())
      .then(tokens => {
        res.header('Authorization', `Bearer ${tokens.authToken}`).send({user, refreshToken: tokens.refreshToken});
      })
      .catch(err => res.status(400).send(err));
});

//login
router.post('/login', function(req, res) {
  const body = pick(req.body, ['password', 'credentials']);
  User.findByCredentials(body.credentials, body.password)
      .then(user => {
        return user.generateAndSaveTokens().then(tokens => {
          res.header('Authorization', `Bearer ${tokens.authToken}`).send({user, refreshToken: tokens.refreshToken});
        });
      }).catch(err => res.status(400).send(err));
});

//refresh tokens
router.post('/refreshTokens', function(req, res) {
  const refreshToken = req.body.refreshToken;
  User.findByRefreshToken(refreshToken).then(user => {
    return user.generateAndSaveTokens().then(newTokens => {
      res.header('Authorization', `Bearer ${newTokens.authToken}`).send({refreshToken: newTokens.refreshToken});
    });
  }).catch(err => {
    console.log(err);
    res.status(401).send(err);
  });
});

//get user info
router.get('/me', authenticate, function(req, res) {
  res.send(req.user);
});

//add favourite bar to user account
router.patch('/', authenticate, function(req, res) {
  const body = pick(req.body.bar, ['id', 'name', 'phone', 'address', 'url']);
  const user = req.user;
  body.timestamp = moment().format('MMMM Do YYYY');
  user.bars.find(bar => bar.id === body.id) || user.bars.unshift(body);
  User.findByIdAndUpdate(user._id, {$set: {bars: user.bars}}, {new: true}).then(user => {
    res.send({user, refreshToken: req.refreshToken});
  }).catch(err => res.status(400).send(err));
});

//delete bar from user account
router.delete('/:id', authenticate, function(req,res) {
  const barId = req.params.id;
  const user = req.user;
  const bars = user.bars.filter(bar => bar.id !== barId);
  User.findByIdAndUpdate(user._id, {$set: {bars}}, {new: true}).then(user => {
    res.send({user, refreshToken: req.refreshToken});
  }).catch(err => res.status(400).send(err));
});

//logout
router.delete('/me', authenticate, function(req, res) {
  req.user.removeToken(req.authToken, req.refreshToken)
          .then(() => res.status(200).send({message: 'tokens successfully deleted'}))
          .catch(err => res.status(400).send(err));
});

module.exports = router;
