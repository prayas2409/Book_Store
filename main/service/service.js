const model = require('../model/model');

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
            let findQuery = {
                find: data.find
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
            let find = {
                $or: [
                    {'title': {$regex: req.field, $options: 'i'}},
                    {'author': {$regex: req.field, $options: 'i'}},
                ]
            };
            let searchQuery = {
                find
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
            let find = {
                $and: [{
                    $where: `${data.minPrice} < parseInt(this.price)`
                }, {
                    $where: `${data.maxPrice} > parseInt(this.price)`
                }]
            };
            let filterQuery = {
                find
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