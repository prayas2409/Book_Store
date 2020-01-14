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
    it(`should return true when book store database found exact count.`, (done) => {
        chai.request(server).get('/books')
            .end((err, res) => {
                if (err) {
                    console.log('a')
                    err.should.have.status(400)
                } else {
                    res.body.data.length.should.be.eql(52)
                    res.should.have.status(200)
                    done()
                }
            })
    });
});