const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
  bars: [],
  local: {
    id: String,
    displayName: String,
    username: {
      type: String,
      trim: true,
      minlength: 4
    },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      minlength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false
    },
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
    email: String
  },
  google: {
    id: String,
    displayName: String,
    email: String
  },
  github: {
    id: String,
    displayName: String,
    email: String
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
  console.log('authToken', authToken);
  try {
    decoded = jwt.verify(authToken, process.env.JWT_AUTHENTICATION_SECRET);
  } catch(err) {
    return Promise.reject(err);
  }
  return User.findOne({
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
    'local.tokens.refreshToken': refreshToken
  }).then(user => {
    return user;
  }).catch(err => Promise.reject(err));
}

UserSchema.methods.generateAndSaveTokens = function() {
  const user = this;

  const authTokenExpirationTime = 60;
  const authToken = jwt.sign({_id: user._id.toHexString(), email: user.local.email, username: user.local.username, access: 'auth'}, process.env.JWT_AUTHENTICATION_SECRET, {
    expiresIn: authTokenExpirationTime
  });

  const refreshTokenExpirationTime = '5d';
  const refreshToken = jwt.sign({_id: user._id.toHexString(), access: 'refresh'}, process.env.JWT_REFRESH_SECRET, {
    expiresIn: refreshTokenExpirationTime
  });

  user.local.tokens = {authToken, refreshToken};
  return user.save().then(() => user.local.tokens);
};

// UserSchema.methods.removeToken = function(authToken, refreshToken) {
//   const user = this;
//   return user.update({
//     $pull: {
//       'local.tokens': {authToken, refreshToken}
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
      console.log('compare', password, user.local.password);
      bcrypt.compare(password, user.local.password).then(res => {
        console.log(res);
        return res ? resolve(user) : reject();
      });
    });
  });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
