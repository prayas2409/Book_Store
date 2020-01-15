const model = require('../model/model');

class Service {
    addBookService(req, callback) {
        try {
            model.create(req, (err, data) => {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, data);
                }
            })
        } catch (err) {
            return callback(err);
        }
    }
}

module.exports = new Service();