const service = require('../main/service/bookService');
const model = require('../main/model/bookModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const sinon = require('sinon');

let sandbox;
let getAllBooksModel;

describe("Add book in database", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "create");
    });
    after(() => {
        model.create.restore();
    });

    it("Given a book details When all book details are proper then Add Books into database", (done) => {
        let request = {
            "id": "01",
            "author": "chetan bhagat",
            "title": "aaaa",
            "image": "sdfsdf",
            "quantity": "12",
            "price": "123",
            "description": "uysdfgyu aogfuhuhu"
        };
        let response = {
            "id": "01",
            "author": "chetan bhagat",
            "title": "aaaa",
            "image": "sdfsdf",
            "quantity": "12",
            "price": "123",
            "description": "uysdfgyu aogfuhuhu"
        };
        getAllBooksModel.returns(Promise.resolve(response));
        service.addBookService(request).then(data => chai.expect(data).to.be.eql(response));
        done();
    });

    it("given book details when book details is empty then it should return error message", (done) => {
        let request = {};
        let response = {
            message: "Request is empty"
        };
        getAllBooksModel.returns(Promise.reject(response.message));
        service.addBookService(request).then(data => chai.expect(data).to.be.eql(response.message));
        done();
    });
});


describe("Get all books from database", () => {
    before(() => {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "read");
    });
    after(() => {
        model.read.restore();
    });

    it("given database when hit getAllBooks api then should return all books", (done) => {
        let request = {};
        let response = [{
            "id": "101",
            "author": "chetan bhagat",
            "title": "Half GirlFriend",
            "image": "myImage.png",
            "quantity": "12",
            "price": "123",
            "description": "love story"
        }];
        getAllBooksModel.returns(Promise.resolve(response));
        service.getAllBooksService(request).then(data => chai.expect(data).to.be.eql(response));
        done();
    });

    it("given database when data not found then should return Error message", (done) => {
        let request = {};
        let response = {
            message: "Book not Found"
        };
        getAllBooksModel.returns(Promise.reject(response.message));
        service.getAllBooksService(request).then(data => chai.expect(data).to.be.eql(response.message));
        done();
    });

});

describe(" Search books from database", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "read");
    });
    after(function () {
        model.read.restore();
    });

    it("given database when search by title or author name then should return exact book", (done) => {
        let request = {
            field: "chetan"
        };
        let response = [{
            "id": "101",
            "author": "chetan bhagat",
            "title": "Half GirlFriend",
            "image": "myImage.png",
            "quantity": "12",
            "price": "123",
            "description": "love story"
        }];
        getAllBooksModel.returns(Promise.resolve(response));
        service.searchBookService(request).then(data => chai.expect(data).to.be.eql(response));
        done();
    });

    it("given database when search by title or author name but book not found then should return error message", () => {
        let request = {
            field: "Node"
        };
        let response = {
            message: "Book not Found"
        };
        getAllBooksModel.returns(Promise.reject(response.message));
        service.searchBookService(request).then(data => chai.expect(data).to.be.eql(response.message));
    });
});

describe("sort books by price from database", () => {
    before( () => {
        sandbox = sinon.createSandbox();
        getAllBooksModel = sandbox.stub(model, "read");
    });
    after( () => {
        model.read.restore();
    });

    it("given database when sort by minPrice and maxPrice then should return exacts books in that price range", (done) => {
        let request = {
            "minPrice": 150,
            "maxPrice": 200
        };
        let response = [{
            "id": "101",
            "author": "chetan bhagat",
            "title": "Half GirlFriend",
            "image": "myImage.png",
            "quantity": "12",
            "price": "160",
            "description": "love story"
        }, {
            "id": "101",
            "author": "Dan brown",
            "title": "Indian super foods",
            "image": "myImage.png",
            "quantity": "12",
            "price": "190",
            "description": "Food Recipe"

        }];
        getAllBooksModel.returns(Promise.resolve(response));
        service.sortAllBooksService(request).then(data => chai.expect(data).to.be.eql(response));
        done();
    });

    it("given database when sort by minPrice and maxPrice but book not found then should return error message", () => {
        let request = {
            "minPrice": 10,
            "maxPrice": 50
        };
        let response = {
           message: "Books not found"
        };
        getAllBooksModel.returns(Promise.reject(response.message));
        service.sortAllBooksService(request).then(data => chai.expect(data).to.be.eql(response.message));
    });

    it("given database when request is empty then should return error message", () => {
        let request = { };
        let response = {
            message: "Invalid Input range "
        };
        getAllBooksModel.returns(Promise.reject(response.message));
        service.sortAllBooksService(request).then(data => chai.expect(data).to.be.eql(response.message));
    });
});
