const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

const GET = [
  {
    "saleId": 1,
    "date": "2022-06-29T20:22:20.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-06-29T20:22:20.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-06-29T20:22:20.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const GET_BY_ID = [
  {
    "date": "2022-06-29T20:22:20.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-06-29T20:22:20.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const MOCK_INSERT = {
  id: 1,
  sale: {
    productId: 1,
    quantity: 3
  },
};

describe('Testa a chamada do getSales na camada model:', function () {
  before(() => {
    sinon.stub(connection, 'execute').resolves(GET);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é retornado um array de objetos:', async function () {
    const sales = await salesModel.getSales();
    expect(sales).to.be.an('array');
    expect(sales).not.to.be.empty;
    sales.forEach((sale) => expect(sale).to.be.an('object'));
  })
})

describe('Testa a chamada do getSalesById na camada model:', function () {
  before(() => {
    sinon.stub(connection, 'execute').resolves([GET_BY_ID]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é retornado um array:', async function () {
    const sale = await salesModel.getSalesById(1);
    expect(sale).to.be.an('array');
    expect(sale).not.to.be.empty;
  })
})

describe('Testa a chamada do createSale na camada model:', function () {
  before(() => {
    sinon.stub(connection, 'execute').resolves([4]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é retornado um id:', async function () {
    const create = await salesModel.createSale();
    expect(create).to.be.an('number');
    expect(create).not.to.be.null;
  });
});

/* describe('Testa a chamada do insertSale na camada model:', function () {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é retornado um id:', async function () {
    await salesModel.insertSale();
    expect(connection.query.called).to.be.equal(true);
  });
}); */