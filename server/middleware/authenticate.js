const User = require('../models/user');

const authenticate = (req, res, next) => {
    let authToken;
    try {
      authToken = req.headers['authorization'].split(' ')[1];
    } catch(err) {
      //ignore if token occurs undefined and split can't work
    }
    User.findByToken(authToken)
    .then(user => {
      if(!user) {
        return Promise.reject();
      } else {
        console.log('local auth - auth token used');
        req.user = user;
        req.authToken = authToken;
        next();
      }
    }).catch(err => {
      console.log(err);
      res.status(401).send({error: 'auth token expired'});
    });
};

module.exports = authenticate;
