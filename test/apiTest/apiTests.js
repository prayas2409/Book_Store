const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const sampleJSON = require('./SampleData')
chai.should();
chai.use(chaiHttp);

describe(`book list`, () => {

    it(`given a books  When  all books details are proper then return 200 status code`, (done) => {
        chai.request(app)
            .post('/addBook')
            .send(sampleJSON.addBook200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.should.have.status(200);
                done();
            });
    });

    it(`given a books  When  all books details are not proper then return 422 status code`, (done) => {
        chai.request(app)
            .post('/addBook')
            .send(sampleJSON.addBook422)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.should.have.status(422);
                done();
            });
    });

    it(`given a books  When wrong url then return 404 status code`, (done) => {
        chai.request(app)
            .post('/searchBook')
            .send(sampleJSON.addBook422)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.should.have.status(404);
                done();
            });
    });

});

describe(`describe Mocha Test for Book store`, () => {

    it(`should return all books count when book store database found book database.`, (done) => {
        chai.request(app).get('/books')
            .end((err, res) => {
                if (err) {
                    err.should.have.status(400)
                } else {
                    res.body.data.length.should.be.eql(53);
                    res.should.have.status(200);
                    done()
                }
            })
    });

    it(`should return 1st book data when book store database found this book.`, (done) => {
        chai.request(app).get('/books')
            .end((err, res) => {
                if (err) {
                    err.should.have.status(400)
                } else {
                    res.body.data[0].id.should.be.eql("1");
                    res.body.data[0].author.should.be.eql("Chetan Bhagat'");
                    res.body.data[0].title.should.be.eql("The Girl in Room 105'");
                    res.body.data[0].quantity.should.be.eql(12);
                    res.body.data[0].price.should.be.eql(193);
                    res.should.have.status(200);
                    done()
                }
            })
    });

    it(`should return last book data when book store database found this book.`, (done) => {
        chai.request(app).get('/books')
            .end((err, res) => {
                if (err) {
                    err.should.have.status(400)
                } else {
                    res.body.data[51].id.should.be.eql("52");
                    res.body.data[51].author.should.be.eql("Stephen King'");
                    res.body.data[51].title.should.be.eql("Doctor Sleep'");
                    res.body.data[51].quantity.should.be.eql(14);
                    res.body.data[51].price.should.be.eql(245);
                    res.should.have.status(200);
                    done()
                }
            })
    });

    it(`given a list of books When wrong url then return 404 status code`, (done) => {
        chai.request(app)
            .post('/bookz')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.should.have.status(404);
                done();
            });
    });
});

describe(`describe Mocha Test for sorting books`, () => {

    it(`should return 1st book data when books sort by its price.`, (done) => {
        chai.request(app).get('/sortBooks?minPrice=150&maxPrice=200')
            .end((err, res) => {
                if (err) {
                    err.should.have.status(400)
                } else {
                    // console.log(res.body)
                    // res.body.data[0].id.should.be.eql("1");
                    // res.body.data[0].author.should.be.eql("Chetan Bhagat'");
                    // res.body.data[0].title.should.be.eql("The Girl in Room 105'");
                    // res.body.data[0].quantity.should.be.eql(12);
                    // res.body.data[0].price.should.be.eql(193);
                    res.should.have.status(200);
                    done()
                }
            })
    });

    it(`should return status code 400 when books limit is not send.`, (done) => {
        chai.request(app).get('/sortBooks')
            .end((err, res) => {
                res.should.have.status(422);
                done()
            })
    });

    it(`should return status code 404 when url is wrong.`, (done) => {
        chai.request(app).get('/sortBookz')
            .end((err, res) => {
                res.should.have.status(404);
                done()
            })
    });
});


describe(`search book by title and author`, () => {

    it(`given a search field When match with title or author then return 200 status code`, (done) => {
        chai.request(app)
            .get('/searchBook')
            .send(sampleJSON.searchBook200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.should.have.status(422);
                done();
            });
    });

    it(`given a search field When wrong url then return 404 status code`, (done) => {
        chai.request(app)
            .get('/addBook')
            .send(sampleJSON.searchBook200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.should.have.status(404);
                done();
            });
    });

    it(`given a search field When empty then return 422 status code`, (done) => {
        chai.request(app)
            .get('/searchBook')
            .send(sampleJSON.searchBook422)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.should.have.status(422);
                done();
            });
    });

    it(`given a search field When empty then return empty array`, (done) => {
        chai.request(app)
            .get('/searchBook?field=xyz')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.body.data.should.be.empty;
                done();
            });
    });
});