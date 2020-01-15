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

describe(`search book by title and author`, () => {

    it(`given a search field When match with title or author then return 200 status code`, (done) => {
        chai.request(app)
            .get('/searchBook')
            .send(sampleJSON.searchBook200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.should.have.status(200);
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
});