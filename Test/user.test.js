const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const { before } = require('mocha');
const db = require('../Config/database');

const server = require('../app');
const { firstUser, secondUser, thirdUser, forthUser } = require('./data');


const should = chai.should();
chai.use(chaiHttp);

//Test User Registration and login 
describe('User Registration and login', () => {

  before(async()=>{
   await chai.request(server).post('/api/auth/register').send(firstUser);
  })

  it('Register successfully', (done) => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(secondUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('Registration failed due to user already registered', (done) => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(firstUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Registration failed due to email is invalid', (done) => {
    thirdUser.email = faker.name.findName();
    chai
      .request(server)
      .post('/api/auth/register')
      .send(thirdUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Registration failed due to email is missing', (done) => {
    const { email, ...user } = thirdUser;
    chai
      .request(server)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Registration failed due to password is missing', (done) => {
    const { password, ...user } = thirdUser;
    chai
      .request(server)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Registration failed due to password is less than 6 digits', (done) => {
    thirdUser.password = '123';
    chai
      .request(server)
      .post('/api/auth/register')
      .send(thirdUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

   it('login successfully', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send(secondUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('login failed due to email is missing', (done) => {
    const { email, ...user } = firstUser;
    chai
      .request(server)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('login failed due to password is missing', (done) => {
    const { password, ...user } = firstUser;
    chai
      .request(server)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('login failed due to password is invalid', (done) => {
    firstUser.password = '123';
    chai
      .request(server)
      .post('/api/auth/login')
      .send(firstUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('login failed due to user not registered', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send(forthUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});









