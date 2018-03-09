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
  tokens: {
    authToken: `${jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET_1)}`,
    refreshToken: `${jwt.sign({_id: userOneId, access: 'refresh'}, process.env.JWT_SECRET_2)}`
  }
}, {
  _id: userTwoId,
  username: 'seconduser',
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: {
    authToken: `${jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET_1)}`,
    refreshToken:`${jwt.sign({_id: userTwoId, access: 'refresh'}, process.env.JWT_SECRET_2)}`
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
