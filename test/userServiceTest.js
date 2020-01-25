const service = require('../main/service/userService');
const model = require('../main/model/userModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const sinon = require('sinon');

let sandbox;
let getAllBooksModel;

describe("add user in database", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "create");
    });
    after(() => {
        model.create.restore();
    });

    it("should add user in dataBase", (done) => {
        let actualData = {
            data: {}
        };
        let expectedData = {
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
        getAllBooksModel.returns(Promise.resolve(expectedData));
        service.addUserService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });

    it("should false when user is't add in dataBase", (done) => {
        let actualData = {
            data: {}
        };
        let expectedData = {
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
        getAllBooksModel.returns(Promise.reject(expectedData));
        service.addUserService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });
});
