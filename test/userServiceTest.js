const service = require('../main/service/userService');
const model = require('../main/model/userModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const sinon = require('sinon');

let sandbox;
let getAllBooksModel;

describe("Add user in database", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "create");
    });
    after(() => {
        model.create.restore();
    });

    it("Given a customer Details When all details are correct then customer info added into user DB", (done) => {
        let request = {
            "bookId": "10",
            "userName": "ravi",
            "phoneNumber": "9876543210",
            "pinCode": "1000000",
            "locality": "mumbai",
            "address": "mumbai",
            "cityTown": "mumbai",
            "landmark": "mumbai",
            "type": "home"
        };
        let response = {
            "bookId": "10",
            "userName": "ravi",
            "phoneNumber": "9876543210",
            "pinCode": "1000000",
            "locality": "mumbai",
            "address": "mumbai",
            "cityTown": "mumbai",
            "landmark": "mumbai",
            "type": "home"
        };
        getAllBooksModel.returns(Promise.resolve(response));
        service.addUserService(request).then(data => chai.expect(data).to.be.eql(response));
        done();
    });

    it("Given a customer Details When details is empty then return error message", (done) => {
        let request = {
            data: {}
        };
        let response = {
           message:"Request is empty"
        };
        getAllBooksModel.returns(Promise.reject(response));
        service.addUserService(request).then(data => chai.expect(data).to.be.eql(response));
        done();
    });
});
