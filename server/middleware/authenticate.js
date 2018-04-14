const User = require('../models/user');

const authenticate = (req, res, next) => {
    let authToken;
    try {
      authToken = req.headers['authorization'].split(' ')[1];
      User.findByToken(authToken)
      .then(user => {
        if(!user) {
          return Promise.reject();
        } else {
          console.log('local auth - auth token used');
          if(req.user) {
            req.localUser = user;
          } else {
            req.user = user;
          }
          req.localAuth = true;
          req.authToken = authToken;
          next();
        }
      }).catch(err => {
        throw err;
      });
    } catch(err) {
      if(req.isAuthenticated()) {
        console.log('social auth', req.user);
        next();
      } else {
        res.status(401).send({error: 'auth token expired or not provided'});
      }
    }
};

module.exports = authenticate;
