let model = require('../../main/model/model')

class Service {

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