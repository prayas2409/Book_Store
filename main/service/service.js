const model = require('../model/model');
const pageGenerator = require('../middleware/middleware');

class Service {

    addBookService(req, next) {
        try {
            return model.create(req).then(data => {
                return data;
            }).catch(err => {
                return err;
            })
        } catch (err) {
            return next(err);
        }
    }

    getAllBooksService(data, next) {
        try {
            // let pagination = pageGenerator.pagination(data.pageNo);
            let findQuery = {
                find: data.find,
                // query: pagination
            };
            return model.read(findQuery).then(result => {
                return result;
            }).catch(err => {
                return err;
            });
        } catch (err) {
            return next(err);
        }
    }

    searchBookService(req, next) {
        try {
            // let pagination = pageGenerator.pagination(req.pageNo);
            let find = {
                $or: [
                    {'title': {$regex: req.field, $options: 'i'}},
                    {'author': {$regex: req.field, $options: 'i'}},
                ]
            };
            let searchQuery = {
                find,
                // query: pagination
            };
            return model.read(searchQuery).then(result => {
                return result;
            }).catch(err => {
                return err;
            });
        } catch (err) {
            return next(err);
        }
    }

    sortAllBooksService(data, next) {
        try {
            // let pagination = pageGenerator.pagination(data.pageNo);
            let find = {
                $and: [{
                    $where: `${data.minPrice} < parseInt(this.price)`
                }, {
                    $where: `${data.maxPrice} > parseInt(this.price)`
                }]
            };
            let filterQuery = {
                find,
                // query: pagination
            };
            return model.read(filterQuery).then(result => {
                return result;
            }).catch(err => {
                return err;
            });
        } catch (err) {
            return next(err);
        }
    }

}

module.exports = new Service();