const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const { fifthUser, products } = require('./data');
const Product = require('../Core/product');
const db = require('../Config/database');
const { afterEach } = require('mocha');

const should = chai.should();
chai.use(chaiHttp);



//Test view previous orders
describe('View previous orders', () => {

  let token;
  before(async () => {
    await chai.request(server).post('/api/auth/register').send(fifthUser);
    const res = await chai.request(server).post('/api/auth/login').send(fifthUser);
    token = res.body.accessToken;
  });

  it('Fetch orders successfully', (done) => {
    chai
      .request(server)
      .get('/api/orders')
      .set('Authorization', 'Bearer ' + token)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
  it('Fetch orders failed due to token is missing', (done) => {
    chai
      .request(server)
      .get('/api/orders')
      .send()
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});
