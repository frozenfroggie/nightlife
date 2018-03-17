const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const randtoken = require('rand-token');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    unique: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: {
    authToken: {
      type: String
    },
    refreshToken: {
      type: String
    }
  },
  bars: []
});

UserSchema.plugin(beautifyUnique);

UserSchema.statics.findByToken = function(authToken) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(authToken, process.env.JWT_SECRET_1);
  } catch(err) {
    return Promise.reject(err);
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.authToken': authToken
  });
}

UserSchema.statics.findByRefreshToken = function(refreshToken) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_2);
  } catch(err) {
    return Promise.reject(err);
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.refreshToken': refreshToken
  }).then(user => {
    return user;
  }).catch(err => Promise.reject(err));
}

UserSchema.methods.toJSON = function() {
  const user = this;
  return pick(user, ['_id', 'email', 'username', 'bars']);
};

UserSchema.methods.generateAndSaveTokens = function() {
  const user = this;

  const authTokenExpirationTime = 60;
  const authToken = jwt.sign({_id: user._id.toHexString(), email: user.email, username: user.username, access: 'auth'}, process.env.JWT_SECRET_1, {
    expiresIn: authTokenExpirationTime
  });

  const refreshTokenExpirationTime = 120;
  const refreshToken = jwt.sign({_id: user._id.toHexString(), access: 'refresh'}, process.env.JWT_SECRET_2, {
    expiresIn: refreshTokenExpirationTime
  });

  user.tokens = {authToken, refreshToken};
  return user.save().then(() => user.tokens);
};

// UserSchema.methods.removeToken = function(authToken, refreshToken) {
//   const user = this;
//   return user.update({
//     $pull: {
//       tokens: {authToken, refreshToken}
//     }
//   });
// };

UserSchema.statics.checkUserExists = function(identifier) {
  const User = this;
  return User.findOne({$or: [{username: identifier}, {email: identifier}]})
             .then(user => user ? true : false);
}

UserSchema.statics.findByCredentials = function(credentials, password) {
  const User = this;
  return User.findOne({$or: [{username: credentials}, {email: credentials}]}).then(user => {
    if(!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          resolve(user);
        } else {
          reject(err);
        }
      });
    });
  });
}

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
