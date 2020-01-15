let assert = require(`assert`);
let controller = require('../../main/controller/controller')
let chai = require('chai')
let chaiHttp = require('chai-http')
chai.use(chaiHttp);
let server = require('../../app')
let should = chai.should();
let fs = require('fs')

function readFile() {
    var obj = fs.readFileSync(`${__dirname}/testData.json`)
    let data = JSON.parse(obj);
    return data;
}

describe(`describe Mocha Test for Book store`, () => {
    var data = readFile();
    it(`should return all books count when book store database found book database.`, (done) => {
        chai.request(server).get('/books')
            .end((err, res) => {
                if (err) {
                    err.should.have.status(400)
                } else {
                    res.body.data.length.should.be.eql(52)
                    res.should.have.status(200)
                    done()
                }
            })
    });
    it(`should return 1st book data when book store database found this book.`, (done) => {
        chai.request(server).get('/books')
            .end((err, res) => {
                if (err) {
                    err.should.have.status(400)
                } else {
                    res.body.data[0].id.should.be.eql("1")
                    res.body.data[0].author.should.be.eql("Chetan Bhagat'")
                    res.body.data[0].title.should.be.eql("The Girl in Room 105'")
                    res.should.have.status(200)
                    done()
                }
            })
    });
    it(`should return last book data when book store database found this book.`, (done) => {
        chai.request(server).get('/book')
            .end((err, res) => {
                if (err) {
                    console.log('wrong')
                    err.should.have.status(404)
                } else {
                    res.body.data[51].id.should.be.eql("52");
                    res.body.data[51].author.should.be.eql("Stephen King'");
                    res.body.data[51].title.should.be.eql("Doctor Sleep'");
                    res.should.have.status(200)
                    done()
                }
            })
    });
});