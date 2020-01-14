const model = require('../model/model');

class Service {
    addBookService(req, callback) {
        model.create(req, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        })
    }
}

module.exports = new Service();