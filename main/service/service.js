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

    getAllBooksService(data, callBack) {
        try {
            model.read(data, (err, result) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, result);
                }
            });
        } catch (err) {
            return callBack(err);
        }
    }

}

module.exports = new Service();