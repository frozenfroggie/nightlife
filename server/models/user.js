const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

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
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  bars: []
});

UserSchema.plugin(beautifyUnique);

UserSchema.statics.findByToken = function(token) {
//console.log(token);
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch(err) {
    return Promise.reject(err);
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

UserSchema.methods.toJSON = function() {
  const user = this;
  return pick(user, ['_id', 'email', 'username', 'bars']);
};

UserSchema.methods.generateAndSaveAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), email: user.email, username: user.username, access}, process.env.JWT_SECRET);
  user.tokens.push({access, token});
  return user.save().then(() => token);
};

UserSchema.methods.removeToken = function(token) {
  const user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

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
