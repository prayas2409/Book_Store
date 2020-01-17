const service = require('../../main/service/service');
const model = require('../../main/model/model');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const sinon = require('sinon');

let sandbox;
let getAllBooksModel;

describe("get all books from database", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "read");
    });
    after(function () {
        model.read.restore();
    });

    it("should return all books", (done) => {
        let actualData = {
            find: {},
            pageNo: 1
        };
        let expectedData = {
            "id": "101",
            "title": "Node js"
        };
        getAllBooksModel.returns(Promise.resolve(expectedData));
        service.getAllBooksService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });
});