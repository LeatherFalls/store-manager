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

describe('Testa a chamada do getSales na camada model:', function () {
  before(() => {
    sinon.stub(connection, 'execute').resolves([GET, []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é retornado um array de objetos:', async function () {
    const sales = await salesModel.getSales();
    expect(seles).to.be.an('array');
    expect(sales).not.to.be.empty;
    sales.forEach((sale) => expect(sale).to.be.an('object'));
  })
})

describe('Testa a chamada do getSalesById na camada model:', function () {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[GET_BY_ID], []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é retornado um objeto:', async function () {
    const sale = await salesModel.getSalesById();
    expect(sale).to.be.an('object');
    expect(sale).not.to.be.empty;
  })
})
