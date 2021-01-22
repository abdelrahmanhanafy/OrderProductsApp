const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const { sixthUser } = require('./data');

const should = chai.should();
chai.use(chaiHttp);


//Test view products
describe('View products', () => {

  let token;
  before(async () => {
    await chai.request(server).post('/api/auth/register').send(sixthUser);
    const res = await chai.request(server).post('/api/auth/login').send(sixthUser);
    token = res.body.accessToken;
  });

  it('Fetch products successfully', (done) => {
    chai
      .request(server)
      .get('/api/products')
      .set('Authorization', 'Bearer ' + token)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
  it('Fetch products failed due to token is missing', (done) => {
    chai
      .request(server)
      .get('/api/products')
      .send()
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});
