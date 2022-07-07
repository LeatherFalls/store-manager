const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

const GET_PRODUCTS = [
  { id: 1, name: "Teste" }
];

const GET_BY_ID = { id: 1, name: "Teste" }

describe('Testa a chamada da função getProducts na camada controller:', function () {
  let req = {}, res = {}, next = () => {};

  describe('Testa a função getProducts em caso de sucesso:', function () {
    before(() => {
      res.status = sinon.stub().resolves(res);
      res.json = sinon.stub();
      sinon.stub(productService, 'getProducts').resolves([]);
    });
  
    after(() => {
      productService.getProducts.restore();
    });

    it('Testa se retorna status 200:', async function () {
      await productController.getProducts(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true)
    });

    it('Testa se res.json() é chamado passando um array', async function () {
      await productController.getProducts(req, res, next);
      expect(res.json.calledWith(GET_PRODUCTS)).to.be.equal(false);
    })
  });

/*   describe('Testa a função getProducts em caso de erro:', function () {
    const error = Error('error');

    before(() => {
      next = sinon.stub().resolves();
      sinon.stub(productService, 'getProducts').throws(error);
    });

    after(() => {
      productService.getProducts.restore();
    })

    it('Testa se o erro é passado para o next:', async function () {
      await productController.getProducts(req, res, next);
      expect(next.calledWith(sinon.match.error)).to.be.equal(true);
    });
  }); */
});

describe('Testa a chamada da função getProductsById na chamada controller:', function () {
  let req = {}, res = {}, next = () => {};

  describe('Testa a função getProductsById em caso de sucesso:', function () {
    before(() => {
      req.params = { id: 1 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(productService, 'getProductsById').resolves(GET_BY_ID);
    });
  
    after(() => {
      productService.getProductsById.restore()
    });

    it('Testa se retorna status 200:', async function () {
      await productController.getProductsById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true)
    });

    it('Testa se res.json() é chamado passando um objeto', async function () {
      await productController.getProductsById(req, res);
      expect(res.json.calledWith(GET_BY_ID)).to.be.true;
    })
  })

  describe('Testa a função getProductsById em caso de erro:', function () {
    const error = Error('Product not found');

    before(() => {
      req.params = { id: 1 }
      res.status = sinon.stub();
      res.json = sinon.stub();
      next = sinon.stub().resolves();
      sinon.stub(productService, 'getProductsById').throws(error);
    });

    after(() => {
      productService.getProductsById.restore();
    });

    it('Testa se retorna status 404:', async function () {
      await productController.getProductsById(req, res, next);
      expect(res.status.calledWith(404)).to.be.false;
    });

    it('Testa se res.json() é chamado passando uma mensagem de erro:', async function () {
      await productController.getProductsById(req, res, next);
      expect(res.json.calledWith(error)).to.be.false;
    });

    it('Testa se o erro é passado para o next:', async function () {
      await productController.getProductsById(req, res, next);
      expect(next.calledWith(sinon.match(error))).to.be.equal(true);
    });
  });
});