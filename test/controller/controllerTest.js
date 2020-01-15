const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const sampleJSON = require('./SampleData');
chai.should();
chai.use(chaiHttp);

describe(`describe Mocha Test for Book store`, () => {

    it(`should return all books count when book store database found book database.`, (done) => {
        chai.request(app).get('/books')
            .end((err, res) => {
                if (err) {
                    err.should.have.status(400)
                } else {
                    res.body.data.length.should.be.eql(52);
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
                    res.should.have.status(200);
                    done()
                }
            })
    });

    it(`should return last book data when book store database found this book.`, (done) => {
        chai.request(app).get('/book')
            .end((err, res) => {
                if (err) {
                    err.should.have.status(404)
                } else {
                    res.body.data[51].id.should.be.eql("52");
                    res.body.data[51].author.should.be.eql("Stephen King'");
                    res.body.data[51].title.should.be.eql("Doctor Sleep'");
                    res.should.have.status(200);
                    done()
                }
            })
    });
});

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
});