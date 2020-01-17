const service = require('../../main/service/service');
const model = require('../../main/model/model');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const sinon = require('sinon');

let sandbox;
let getAllBooksModel;

describe("add book in database", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "create");
    });
    after(() => {
        model.create.restore();
    });

    it("should add one book in dataBase", (done) => {
        let actualData = {
            data: {}
        };
        let expectedData = {
            "id": "01",
            "author": "chetan bhagat",
            "title": "aaaa",
            "image": "sdfsdf",
            "quantity": "12",
            "price": "123",
            "description": "uysdfgyu aogfuhuhu"
        };
        getAllBooksModel.returns(Promise.resolve(expectedData));
        service.addBookService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });

    it("should false when book is't add in dataBase", (done) => {
        let actualData = {
            data: {}
        };
        let expectedData = {
            "id": "01",
            "author": "chetan bhagat",
            "title": "aaaa",
            "image": "sdfsdf",
            "quantity": "12",
            "price": "123",
            "description": "uysdfgyu aogfuhuhu"
        };
        getAllBooksModel.returns(Promise.reject(expectedData));
        service.addBookService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });
});


describe("get all books from database", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "read");
    });
    after(function () {
        model.read.restore();
    });

    it("should return all books", (done) => {
        let actualData = {};
        let expectedData = {
            "id": "101",
            "title": "Node js"
        };
        getAllBooksModel.returns(Promise.resolve(expectedData));
        service.getAllBooksService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });

    it("should return false when page no is '0' books", (done) => {
        let actualData = {
            find: {},
            pageNo: 0
        };
        let expectedData = {
            "id": "101",
            "title": "Node js"
        };
        getAllBooksModel.returns(Promise.reject(expectedData));
        service.getAllBooksService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });

});

describe("get search books from database", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "read");
    });
    after(function () {
        model.read.restore();
    });

    it("should return search books", (done) => {
        let actualData = {
            field: "Node",
            pageNo: 1
        };
        let expectedData = [{
            "id": "101",
            "title": "Node js"
        }];
        getAllBooksModel.returns(Promise.resolve(expectedData));
        service.searchBookService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });

    it("should return false when can't search book", () => {
        let actualData = {
            field: "Node",
            pageNo: 1
        };
        let expectedData = [{
            "id": "101",
            "title": "Node js"
        }];
        getAllBooksModel.returns(Promise.reject(expectedData));
        service.searchBookService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
    });
});

describe("get sort books from database", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "read");
    });
    after(function () {
        model.read.restore();
    });

    it("should return sort books", (done) => {
        let actualData = {
            "minPrice": 150,
            "maxPrice": 200,
            pageNo: 1
        };
        let expectedData = [{
            "id": "101",
            "title": "Node js",
            "price": 170
        }, {
            "id": "102",
            "title": "java s",
            "price": 190

        }];
        getAllBooksModel.returns(Promise.resolve(expectedData));
        service.sortAllBooksService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
        done();
    });

    it("should return false sort books", () => {
        let actualData = {};
        let expectedData = [{
            "id": "101",
            "title": "Node js",
            "price": 170
        }, {
            "id": "102",
            "title": "java s",
            "price": 190
        }];
        getAllBooksModel.returns(Promise.reject(expectedData));
        service.sortAllBooksService(actualData).then(data => chai.expect(data).to.be.eql(expectedData));
    });
});