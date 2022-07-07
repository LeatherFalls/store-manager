const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

const GET_SALES = [{
  saleId: 1,
  date: '2022-07-07T14:03:17.000Z',
  productId: 1,
  quantity: 5,
}];

const GET_BY_ID = [{
  date: '2022-07-07T14:12:17.000Z',
  productId: 3,
  quantity: 15
}]

describe('Testa a chamada da função getSales na camada controller:', function () {
  let req = {}, res = {}, next = () => {};
  
  describe('Testa a função getSales em caso de sucesso:', function () {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSales').resolves([]);
    });

    after(() => {
      salesService.getSales.restore();
    });

    it('Testa se retorna status 200:', async function () {
      await salesController.getSales(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true)
    });

    it('Testa se res.json() é chamado passando um array', async function () {
      await salesController.getSales(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  });

  describe('Testa a função getSales em caso de erro:', function () {
    const error = Error('error');

    before(() => {
      next = sinon.stub().resolves();
      sinon.stub(salesService, 'getSales').throws(error);
    });

    after(() => {
      salesService.getSales.restore();
    })

    it('Testa se o erro é passado para o next:', async function () {
      await salesController.getSales(req, res, next);
      expect(next.calledWith(sinon.match(error))).to.be.equal(true);
    });
  });
});

describe('Testa a chamada da função getSalesById na camada controller:', function () {
  let req = {}, res = {}, next = () => {};
  
  describe('Testa a função getSalesById em caso de sucesso:', function () {
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById').resolves([[]]);
    });

    after(() => {
      salesService.getSalesById.restore();
    });

    it('Testa se retorna status 200:', async function () {
      await salesController.getSalesById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Testa se res.json() é chamado passando um array', async function () {
      await salesController.getSalesById(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  });

  describe('Testa a função getSalesById em caso de erro:', function () {
    const error = Error('Sale not found');

    before(() => {
      req.params = { id: 1 }
      res.status = sinon.stub();
      res.json = sinon.stub();
      next = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById').throws(error);
    });

    after(() => {
      salesService.getSalesById.restore();
    });

    it('Testa se o erro é passado para o next:', async function () {
      await salesController.getSalesById(req, res, next);
      expect(next.calledWith(sinon.match(error))).to.be.equal(true);
    });
  });
});