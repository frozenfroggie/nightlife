const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const User = require('../models/user');
const pick = require('lodash/pick');

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
      .then(() => user.generateAndSaveAuthToken())
      .then(token => res.header('Authorization', `Bearer ${token}`).send(user))
      .catch(err => res.status(400).send(err));
});

//login
router.post('/login', function(req, res) {
  const body = pick(req.body, ['password', 'credentials']);
  User.findByCredentials(body.credentials, body.password)
      .then(user => {
        return user.generateAndSaveAuthToken().then(token => {
          res.header('Authorization', `Bearer ${token}`).send(user);
        });
      }).catch(err => res.status(400).send(err));
});

//get user info
router.get('/me', authenticate, function(req, res) {
  res.send(req.user);
});

//add favourite bar to user account
router.patch('/', authenticate, function(req, res) {
  const body = pick(req.body, ['name', 'phone', 'address', 'url']);
  const user = req.user;
  user.bars.push(body);
  User.findByIdAndUpdate(user._id, {$set: {bars: user.bars}}, {new: true}).then(user => {
    res.send(user);
  }).catch(err => res.status(400).send(err));
});

//logout
router.delete('/me', authenticate, function(req, res) {
  req.user.removeToken(req.token)
          .then(() => res.status(200).send({message: 'token successfully deleted'}))
          .catch(err => res.status(400).send(err));
});

module.exports = router;
