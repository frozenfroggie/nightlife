const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');

const User = require('../models/user');
const app = require('../server');
const {populateUsers, users} = require('./seedData/seed');

beforeEach(populateUsers);

describe('Signing up', () => {
  it('should create a user', (done) => {
    const email = 'example@example.com';
    const password = '123mnb!';
    const username = 'kubaa';
    request(app)
      .post('/users')
      .send({email, password, username})
      .expect(200)
      .expect(res => {
        expect(res.headers['authorization']).to.be.ok;
        expect(res.body.user._id).to.be.ok;
        expect(res.body.user.email).to.be.equal(email);
        expect(res.body.user.username).to.be.equal(username);
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        User.findOne({username, email}).then(user => {
          expect(user).to.be.ok;
          done();
        }).catch(e => done(e));
      });
  });
  it('should return validation errors if request invalid', done => {
    request(app)
      .post('/users')
      .send({
        username: 'buu',
        email: 'and',
        password: '123'
      })
      .expect(400)
      .end(done);
  });
  it('should not create user if email in use', (done) => {
    request(app)
      .post('/users')
      .send({
        username: 'superuser',
        email: users[0].email,
        password: 'Password123!'
      })
      .expect(400)
      .end(done);
  });
  it('should not create user if username in use', (done) => {
    request(app)
      .post('/users')
      .send({
        username: users[0].username,
        email: 'kux41@autoaf.pl',
        password: 'Password123!'
      })
      .expect(400)
      .end(done);
  });
});

describe('Logging in', () => {
  it('should login user and return auth token by headers and refresh token by body', (done) => {
    request(app)
      .post('/users/login')
      .send({
        credentials: users[0].email,
        password: users[0].password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['authorization']).to.be.ok;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[0]._id).then(user => {
          const authToken = user.tokens.authToken;
          const refreshToken = user.tokens.refreshToken;
          expect(authToken).to.be.equal(res.headers['authorization'].split(' ')[1]);
          expect(refreshToken).to.be.equal(res.body.refreshToken);
          done();
        }).catch((e) => done(e));
      });
  });
  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['authorization']).to.not.be.ok;
      })
      .end(done);
  });
});

describe('Getting user information', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set({'Authorization': `Bearer ${users[0].tokens.authToken}`})
      .expect(200)
      .expect((res) => {
        expect(res.body._id).to.equal(users[0]._id.toHexString());
        expect(res.body.email).to.equal(users[0].email);
      })
      .end(done);
  });
  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).to.deep.equal({error: 'auth token expired'});
      })
      .end(done);
  });
});

describe('Refreshing tokens after expiration of auth token', () => {
  it('should generate new tokens if refresh token is valid', (done) => {
    request(app)
      .post('/users/refreshTokens')
      .send({
        refreshToken: users[0].tokens.refreshToken
      })
      .expect(200)
      .expect(res => {
        expect(res.body.refreshToken).to.be.ok;
        expect(res.body.refreshToken).to.not.equal(users[0].tokens.refreshToken);
        expect(res.headers['authorization']).to.be.ok;
      })
      .end(done);
  });
  it('should return 401 if refresh token also expired', (done) => {
      request(app)
        .post('/users/refreshTokens')
        .send({
          refreshToken: users[1].tokens.refreshToken
        })
        .expect(401)
        .expect((res) => {
          expect(res.body).to.deep.equal({error: 'refresh token expired'});
        })
        .end(done);
  });
});

// describe('Logging out', () => {
//   it('should remove auth bearer token on logout', done => {
//     request(app)
//       .delete('/users/me')
//       .set({'Authorization': `Bearer ${users[0].tokens.authToken}`})
//       .expect(200)
//       .end((err, res) => {
//         if(err) {
//           return done(err);
//         }
//         console.log(res.body);
//         expect(res.body.message).to.equal('tokens successfully deleted');
//         User.findById(users[0]._id).then(user => {
//           expect(user.tokens.length).to.equal(0);
//           done();
//         }).catch(err => done(err));
//       });
//   });
// });
