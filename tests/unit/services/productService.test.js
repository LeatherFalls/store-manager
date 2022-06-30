const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

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

describe('Testa a chamada do getProducts na camada services', function () {
  before(() => {
    sinon.stub(productModel, 'getProducts').resolves(GET)
  });

  after(() => {
    productModel.getProducts.restore()
  });

  it('Testa se é retornado um array de objetos:', async function () {
    const products = await productService.getProducts();
    expect(products).to.be.an('array');
    expect(products).not.to.be.empty;
    products.forEach((product) => expect(product).to.be.an('object'));
  })
});

describe('Testa a chamada do getProductsById na camada services', function () {
  before(() => {
    sinon.stub(productModel, 'getProductsById').resolves(GET_BY_ID)
  });

  after(() => {
    productModel.getProductsById.restore()
  });

  it('Testa se é retornado um objeto:', async function () {
    const product = await productService.getProductsById();
    expect(product).to.be.an('object');
    expect(product).not.to.be.empty;
  })
});

describe('Testa as condicionais da função getProductsById na camada services', function () {
  before(() => {
    sinon.stub(productModel, 'getProductsById').resolves(false)
  });

  after(() => {
    productModel.getProductsById.restore()
  });

  it('Testa se a função getProductsById retorna falso se a venda não for encontrada', async function () {
    const sale = await productService.getProductsById(4);
    expect(sale).to.be.false;
  })
})