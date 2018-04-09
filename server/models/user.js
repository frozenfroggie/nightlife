const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
  local: {
    id: String,
    displayName: String,
    username: String,
    email: String,
    password: String,
    isVerified: Boolean,
    bars: [],
    tokens: {
      authToken: {
        type: String
      },
      refreshToken: {
        type: String
      }
    }
  },
  facebook: {
    id: String,
    displayName: String,
    email: String,
    password: String,
    bars: []
  },
  google: {
    id: String,
    displayName: String,
    username: String,
    email: String,
    password: String,
    bars: []
  },
  github: {
    id: String,
    displayName: String,
    username: String,
    email: String,
    password: String,
    bars: []
  }
  // username: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   minlength: 4,
  //   unique: true
  // },
  // firstName: {
  //   type: String,
  //   trim: true
  // },
  // lastName: {
  //   type: String,
  //   trim: true
  // },
  // email: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   unique: true,
  //   validate: {
  //     validator: validator.isEmail,
  //     message: '{VALUE} is not a valid email'
  //   }
  // },
  // isVerified: {
  //   type: Boolean,
  //   default: false
  // },
  // password: {
  //   type: String,
  //   required: false,
  //   minlength: 6,
  // },
  // tokens: {
  //   authToken: {
  //     type: String
  //   },
  //   refreshToken: {
  //     type: String
  //   }
  // },
  // bars: []
});

UserSchema.plugin(findOrCreate);
UserSchema.plugin(beautifyUnique);

UserSchema.statics.findByToken = function(authToken) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(authToken, process.env.JWT_AUTHENTICATION_SECRET);
  } catch(err) {
    return Promise.reject(err);
  }
  return User.findOne({
    'local._id': decoded._id,
    'local.tokens.authToken': authToken
  });
}

UserSchema.statics.findByRefreshToken = function(refreshToken) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch(err) {
    return Promise.reject(err);
  }
  return User.findOne({
    'local._id': decoded._id,
    'local.tokens.refreshToken': refreshToken
  }).then(user => {
    return user;
  }).catch(err => Promise.reject(err));
}

// UserSchema.methods.toJSON = function() {
//   const user = this;
//   return pick(user, ['_id', 'email', 'username', 'bars']);
// };

UserSchema.methods.generateAndSaveTokens = function() {
  const user = this;

  const authTokenExpirationTime = 60;
  const authToken = jwt.sign({_id: user.local._id.toHexString(), email: user.local.email, username: user.local.username, access: 'auth'}, process.env.JWT_AUTHENTICATION_SECRET, {
    expiresIn: authTokenExpirationTime
  });

  const refreshTokenExpirationTime = '5d';
  const refreshToken = jwt.sign({_id: user.local._id.toHexString(), access: 'refresh'}, process.env.JWT_REFRESH_SECRET, {
    expiresIn: refreshTokenExpirationTime
  });

  user.local.tokens = {authToken, refreshToken};
  return user.save().then(() => user.local.tokens);
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
  return User.findOne({$or: [{'local.username': identifier}, {'local.email': identifier}]})
             .then(user => user ? true : false);
}

UserSchema.statics.findByCredentials = function(credentials, password) {
  const User = this;
  console.log('buu');
  return User.findOne({$or: [{'local.username': credentials}, {'local.email': credentials}]}).then(user => {
    if(!user) {
      console.log('no user');
      return Promise.reject();
    }
    if(!user.local.isVerified) {
      console.log('not verified');
      return Promise.reject({ type: 'not-verified', msg: 'Please confirm your email address first' });
    }
    return new Promise((resolve, reject) => {
      console.log(user);
      console.log('what?', password, user.local.password);
      bcrypt.compare(password, user.local.password, (err, res) => {
        console.log('res', res);
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
  console.log(user.local);
  console.log(user.local.isModified('password'));
  if (user.local.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.local.password, salt, (err, hash) => {
        user.local.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
