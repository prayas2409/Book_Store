const model = require('../model/bookModel');

class BookService {

    /**
     * Purpose : add book
     * @param req
     * @param next
     * @returns {Promise<unknown>|*}
     */
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

    /**
     * Purpose : get all data from database
     * @param data
     * @param next
     * @returns {Promise<unknown>|*}
     */
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

    /**
     * Purpose : search book from db
     * @param req
     * @param next
     * @returns {Promise<unknown>|*}
     */
    searchBookService(req, next) {
        try {
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

    /**
     * Purpose : sort books with it's price
     * @param data
     * @param next
     * @returns {Promise<>|*}
     */
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
                find,
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

module.exports = new BookService();