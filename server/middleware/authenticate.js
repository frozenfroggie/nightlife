const User = require('../models/user');

const authenticate = (req, res, next) => {
  let token;
  try {
    token = req.headers['authorization'].split(' ')[1];
  } catch(err) {
    //ignore if token occurs undefined and split can't work
  }
  User.findByToken(token)
      .then(user => {
        if(!user) {
          return Promise.reject();
        } else {
          req.user = user;
          req.token = token;
          next();
        }
      }).catch(e => res.status(401).send());
};

module.exports = authenticate;
