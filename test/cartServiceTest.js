const service = require('../main/service/cartService');
const model = require('../main/model/cartModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const sinon = require('sinon');

let sandbox;
let getAllBooksModel;

describe("add cart in database", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "create");
    });
    after(() => {
        model.create.restore();
    });

    it("should add cart in dataBase", (done) => {
        let actualData = {
            data: {}
        };
        let expectedData = {
            "userId": "101",
            "book_Id": "102",
            "price": "150",
            "quantity": "1",
        };
        getAllBooksModel.returns(Promise.resolve(expectedData));
        service.addCartService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });

    it("should false when cart is't add in dataBase", (done) => {
        let actualData = {
            data: {}
        };
        let expectedData = {
            "userId": "101",
            "book_Id": "102",
            "price": "150",
            "quantity": "1",
        };
        getAllBooksModel.returns(Promise.reject(expectedData));
        service.addCartService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });
});
