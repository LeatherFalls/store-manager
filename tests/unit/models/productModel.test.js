const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');

const GET = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const GET_BY_ID = {
  "id": 1,
  "name": "Martelo de Thor"
};

describe('Testa a chamada do getProducts, na camada model:', function () {
  before(() => {
    sinon.stub(connection, 'execute').resolves([GET, []]);
  });

  after(() => {
    connection.execute.restore();
  });
  
  it('Testa se é retornado um array de objetos:', async function () {
    const products = await productModel.getProducts();
    expect(products).to.be.an('array');
    expect(products).not.to.be.empty;
    products.forEach((product) => expect(product).to.be.an('object'));
  })
})

describe('Testa a chamada do getProductsById na camada model:', function () {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[GET_BY_ID], []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Testa se é retornado um objeto:', async function () {
    const product = await productModel.getProductsById();
    expect(product).to.be.an('object');
    expect(product).not.to.be.empty;
  })
})
