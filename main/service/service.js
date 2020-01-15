const model = require('../model/model');

class Service {

    addBookService(req, callback, next) {
        try {
            model.create(req, (err, data) => {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, data);
                }
            })
        } catch (err) {
            return next(err);
        }
    }

    getAllBooksService(data, callBack, next) {
        try {
            model.read(data, (err, result) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, result);
                }
            });
        } catch (err) {
            return next(err);
        }
    }

    searchBookService(req, callback, next) {
        try {
            let searchBook = {
                $or: [
                    {'title': {$regex: req.field, $options: 'i'}},
                    {'author': {$regex: req.field, $options: 'i'}},
                ]
            };
            model.read(searchBook, (err, data) => {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, data);
                }
            })
        } catch (err) {
            return next(err);
        }
    }

    sortAllBooksService(data, callBack) {
        let find = {
                $and: [{"price": {$gte: data.minPrice}}, {"price": {$lte: data.maxPrice}}]
            }
        ;
        try {
            model.read(find, (err, result) => {
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