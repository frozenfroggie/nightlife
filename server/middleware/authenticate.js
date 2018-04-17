const User = require('../models/user');

const authenticate = (req, res, next) => {
    let authToken;
    try {
      authToken = req.headers['authorization'].split(' ')[1];
    } catch(err) {
      //ignore if token occurs undefined and split can't work
    }
    User.findByAuthToken(authToken)
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
        next();
      }
    }).catch(err => {
      console.log(err);
      res.status(401).send({error: 'auth token expired'});
    });
};

module.exports = authenticate;
