const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

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

describe('Testa a chamada do getSales na camada services:', function () {
  before(() => {
    sinon.stub(salesModel, 'getSales').resolves(GET)
  });

  after(() => {
    salesModel.getSales.restore()
  });

  it('Testa se é retornado um array de objetos:', async function () {
    const sales = await salesService.getSales();
    expect(sales).to.be.an('array');
    expect(sales).not.to.be.empty;
    sales.forEach((sale) => expect(sale).to.be.an('object'));
  })
});

describe('Testa a chamada do getSalesById na camada services:', function () {
  before(() => {
    sinon.stub(salesModel, 'getSalesById').resolves(GET_BY_ID)
  });

  after(() => {
    salesModel.getSalesById.restore()
  });

  it('Testa se é retornado um array:', async function () {
    const sale = await salesService.getSalesById(1);
    expect(sale).to.be.an('array');
    expect(sale).not.to.be.empty;
  })
});

describe('Testa as condicionais da função getSalesById na camada services', function () {
  before(() => {
    sinon.stub(salesModel, 'getSalesById').resolves(false)
  });

  after(() => {
    salesModel.getSalesById.restore()
  });

  it('Testa se a função getSalesById retorna falso se a venda não for encontrada', async function () {
    const sale = await salesService.getSalesById(4);
    expect(sale).to.be.false;
  })
})

describe('Testa a chamada da função createSale na camada services:', function () {
  const saleId = 1
  before(() => {
    sinon.stub(salesModel, 'createSale').resolves(saleId)
  });

  after(() => {
    salesModel.createSale.restore()
  });

  it('Testa se a função createSale retorna um id', async function () {
    const sale = await salesService.createSale();
    expect(sale).to.be.an('number');
  })
});