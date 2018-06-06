const express = require('express');
const pick = require('lodash/pick');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const uploadToS3 = require('../utils/uploadToS3');
const authenticate = require('../middleware/authenticate');
const User = require('../models/user');
const VerificationToken = require('../models/verificationToken');

const router = express.Router();

//identification if user exists
router.get('/search/:identifier', function(req, res) {
  User.checkUserExists(req.params.identifier)
      .then(isUserExists => res.send({isUserExists}))
      .catch(err => res.status(400).send(err));
});

//signup
router.post('/', function(req, res) {
  const { username, email, firstName, lastName, password } = pick(req.body, ['username', 'email', 'firstName', 'lastName', 'password']);
  bcrypt.hash(password, 10).then(hash => {
    const user = new User({'local.username': username, 'local.email': email, 'local.firstName': firstName, 'local.lastName': lastName, 'local.password': hash});
    user.save()
    .then(() => {
      var verificationToken = new VerificationToken({_userId: user._id});
      return verificationToken.generate(user._id);
    })
    .then(verificationToken => {
      const url = `https://vast-everglades-58513.herokuapp.com/users/confirmation/${verificationToken}`;
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.local.email,
        from: 'no-reply@nightlife.com',
        subject: 'Welcome to Nightlife! Confirm Your Email',
        html:  `
        <table style="width: 100%;">
          <tr>
            <td style="text-align: center;">
              <img width="50px" src="https://image.ibb.co/fCdOVS/apple_icon_57x57.png" alt="apple_icon_57x57" border="0">
            </td>
          </tr>
          <tr>
            <td style="text-align: center; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;
              font-weight: 300; color: #294661!important;">
              <h2>You're on your way! Let's confirm your email address.</h2>
              <p>By clicking on the following link, you are confirming your email address.</p>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
              <a style="box-sizing: border-box; border-color: #348eda; font-weight: 400; text-decoration: none;
                display: inline-block; margin: 0; color: #ffffff; background-color: rgb(107, 44, 163);
                border-radius: 2px; font-size: 14px; padding: 12px 45px;"
                href="${url}">Confirm Email Address</a>
            </td>
          </tr>
        </table>`
      };
      sgMail.send(msg);
      res.send({ user });
    })
    .catch(err => res.status(500).send(err));
  });
});

//verify email address
router.get('/confirmation/:token', function(req, res) {
  try {
    const { id } = jwt.verify(req.params.token, process.env.JWT_VERIFICATION_SECRET);
    console.log('confirmation', id);
    User.findByIdAndUpdate(id, {$set: {'local.isVerified': true }}, {new: true}).then(user => {
      console.log('user after verification', user);
    }).catch(err => {
      throw error;
    });
  } catch(err) {
    res.send(err);
  }
  res.redirect('/');
});

//login
router.post('/login', function(req, res) {
  const { password, credentials } = pick(req.body, ['password', 'credentials']);
  User.findByCredentials(credentials, password)
      .then(user => {
        console.log('user', user);
        return user.generateAndSaveTokens().then(tokens => {
          console.log(tokens);
          res.header('Authorization', `Bearer ${tokens.authToken}`).send({user, authorization: tokens.authToken, refreshToken: tokens.refreshToken});
        });
      }).catch(err => res.status(400).send(err));
});

//refresh tokens
router.post('/refreshTokens', function(req, res) {
  const refreshToken = req.body.refreshToken;
  User.findByRefreshToken(refreshToken).then(user => {
    console.log('findByRefreshToken', JSON.stringify(user, null, 4));
    return user.generateAndSaveTokens().then(newTokens => {
      console.log('generateAndSaveTokens', JSON.stringify(newTokens, null, 4));
      res.header('Authorization', `Bearer ${newTokens.authToken}`).send({authorization: newTokens.authToken, refreshToken: newTokens.refreshToken});
    });
  }).catch(err => {
    res.status(401).send({error: 'refresh token expired'});
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

//add avatar to user account
router.post('/uploadAvatar', authenticate, function(req, res) {
  const user = req.user;
  uploadToS3(req.files.avatar).then(data => {
    User.findByIdAndUpdate(user._id, {$set: {avatarUrl: data.Location}}, {new: true}).then(user => {
      res.send({user, refreshToken: req.refreshToken});
    }).catch(err => res.status(400).send(err));
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
  const user = req.user;
  user.removeToken()
      .then(tokens => {
        console.log(tokens);
        res.send({message: 'tokens successfully deleted'})
      })
      .catch(err => res.status(400).send(err));
});

router.delete('/logout', authenticate, function(req,res) {
});

module.exports = router;
