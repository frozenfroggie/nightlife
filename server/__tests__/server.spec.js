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
        expect(res.body._id).to.be.ok;
        expect(res.body.email).to.be.equal(email);
        expect(res.body.username).to.be.equal(username);
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
  it('should login user and return bearer token', (done) => {
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
          const userOneToken = user.tokens[1];
          expect(userOneToken).to.include({
            access: 'auth',
            token: res.headers['authorization'].split(' ')[1]
          });
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
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then(user => {
          expect(user.tokens.length).to.equal(1);
          done();
        }).catch(err => done(err));
      });
  });
});

describe('Get user information', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set({'Authorization': `Bearer ${users[0].tokens[0].token}`})
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
        expect(res.body).to.deep.equal({});
      })
      .end(done);
  });
});

describe('Logging out', () => {
  it('should remove auth bearer token on logout', done => {
    request(app)
      .delete('/users/me')
      .set({'Authorization': `Bearer ${users[0].tokens[0].token}`})
      .expect(200)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        expect(res.body.message).to.equal('token successfully deleted');
        User.findById(users[0]._id).then(user => {
          expect(user.tokens.length).to.equal(0);
          done();
        }).catch(err => done(err));
      });
  });
});
