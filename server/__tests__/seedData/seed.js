const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');

const User = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  username: 'firstuser',
  email: 'andrew@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: `${jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET)}`
  }]
}, {
  _id: userTwoId,
  username: 'seconduser',
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: `${jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET)}`
  }]
}];

const populateUsers = done => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {users, populateUsers};
