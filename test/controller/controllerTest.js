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
});