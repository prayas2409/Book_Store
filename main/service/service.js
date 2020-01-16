const model = require('../model/model');
const pageGenerartor = require('../middleware/middleware');

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
            let pagination = pageGenerartor.pagination(data.pageNo);
            let findQuery = {
                find: data.find,
                query: pagination
            };
            model.read(findQuery, (err, result) => {
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
            let pagination = pageGenerartor.pagination(req.pageNo);
            let find = {
                $or: [
                    {'title': {$regex: req.field, $options: 'i'}},
                    {'author': {$regex: req.field, $options: 'i'}},
                ]
            };
            let searchQuery = {
                find,
                query: pagination
            };
            model.read(searchQuery, (err, data) => {
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
        try {
            let pagination = pageGenerartor.pagination(data.pageNo);
            let find = {
                $and: [{
                    $where: `${data.minPrice} < parseInt(this.price)`
                }, {
                    $where: `${data.maxPrice} > parseInt(this.price)`
                }]
            };
            let filterQuery = {
                find,
                query: pagination
            };
            model.read(filterQuery, (err, result) => {
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