const service = require('../main/service/orderService');
const model = require('../main/model/orderModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const sinon = require('sinon');

let sandbox;
let getAllBooksModel;

describe("Add successful order in database", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "create");
    });
    after(() => {
        model.create.restore();
    });

    it("Given a userId and bookId When both id's are correct then order conform and send mail to customer", (done) => {
        let request = {
            "userId": "101",
            "book_Id": "102"
        };
        let response = {
            "orderId": "99976",
            "userId": "5e2c0eb87a7bdf43b908bf81",
            "bookId": "5e1ff27d9d6d3b1318e58143",
        };
        getAllBooksModel.returns(Promise.resolve(response));
        service.addOrderService(request).then(data => chai.expect(data).to.be.eql(response));
        done();
    });

    it("Given a userId and bookId When both id's are inCorrect then return error message", (done) => {
        let request = {
            data: {}
        };
        let response = {
           message:"Incorrect userId or bookId"
        };
        getAllBooksModel.returns(Promise.reject(response));
        service.addOrderService(request).then(data => chai.expect(data).to.be.eql(response));
        done();
    });
});
