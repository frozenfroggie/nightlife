const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcrypt');

const User = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const userOnePassHashed = bcrypt.hashSync('userOnePass', 10);
const userTwoPassHashed = bcrypt.hashSync('userTwoPass', 10);

const users = [{
  _id: userOneId,
  local: {
    isVerified: true,
    username: 'firstuser',
    email: 'andrew@example.com',
    password: userOnePassHashed,
    tokens: {
      authToken: `${jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_AUTHENTICATION_SECRET)}`,
      refreshToken: `${jwt.sign({_id: userOneId, access: 'refresh'}, process.env.JWT_REFRESH_SECRET)}`
    }
  }
}, {
  _id: userTwoId,
  local: {
    isVerified: true,
    username: 'seconduser',
    email: 'jen@example.com',
    password: userTwoPassHashed,
    tokens: {
      authToken: `${jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_AUTHENTICATION_SECRET)}`,
      refreshToken:`${jwt.sign({_id: userTwoId, access: 'refresh'}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: 0 //the token expired at the same moment it was created
      })}`
    }
  }
}];

const populateUsers = done => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {users, populateUsers};
