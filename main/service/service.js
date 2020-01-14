let model = require('../../main/model/model')

class Service {
    constructor() {
    }

    getAllBooks(data, callBack) {
        model.read(data, (err, result) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, result);
            }
        })
    }
}

module.exports = new Service();