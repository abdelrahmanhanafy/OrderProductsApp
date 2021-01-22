const faker = require('faker');

module.exports = {
  firstUser: {
    email: faker.internet.email(),
    password: faker.internet.password(),
    balance: 30000,
  },
  secondUser: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  thirdUser: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  forthUser: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  fifthUser: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  sixthUser: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  products: [
    {
      name: 'galaxy note 20 ultra',
      brand: 'samsung',
      category: 'mobiles',
      price: '20000.00',
    },
    {
      name: 'galaxy note 10 plus',
      brand: 'samsung',
      category: 'mobiles',
      price: '15000.00',
    },
    {
      name: 'galaxy note 9',
      brand: 'samsung',
      category: 'mobiles',
      price: '10000.00',
    },
  ],
};
