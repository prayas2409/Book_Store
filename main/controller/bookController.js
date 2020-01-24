let service = require('../service/bookService');

class BookController {

    /**
     *  Purpose : add new book item in data base.
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    addBookController(req, res, next) {
        let response = {};
        try {
            req.checkBody("id", "Id should not be empty").notEmpty().isInt().isLength({min: 1});
            req.checkBody('author', "Author should not be empty").notEmpty().trim();
            req.checkBody('title', "Title should not be empty").notEmpty();
            req.checkBody('quantity', "Quantity should not be empty").notEmpty();
            req.checkBody('price', "Price should not be empty").notEmpty();

            let error = req.validationErrors();
            if (error) {
                response.success = false;
                response.message = "Validation Error";
                response.error = error;
                return res.status(422).send(response)
            } else {
                let filterData = {
                    "id": req.body.id,
                    "author": req.body.author,
                    "title": req.body.title,
                    "image": req.body.image,
                    "quantity": req.body.quality,
                    "price": req.body.price,
                    "description": req.body.describe
                };
                service.addBookService(filterData, next).then(result => {
                    response.success = true;
                    response.message = "Book Added Successfully!";
                    response.data = result.data;
                    return res.status(200).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.message = "Failed to add book!";
                    response.error = err;
                    return res.status(400).send(response);
                })
            }
        } catch (err) {
            next(err);
        }
    }

    /**
     * Purpose : show all data with read from data base.
     * @param req
     * @param res
     * @param next
     */
    getAllBooksController(req, res, next) {
        let find = {};
        let response = {};
        try {
            let getBooks = {
                find,
            };
            service.getAllBooksService(getBooks, next).then(result => {
                response.success = true;
                response.message = result.message;
                response.data = result.data;
                return res.status(200).send(response);
            }).catch((err) => {
                response.success = false;
                response.message = "Failed to get book!";
                response.error = err;
                return res.status(400).send(response);
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Purpose : search the particular book from data base.
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    searchBookController(req, res, next) {
        let response = {};
        try {
            req.checkQuery('field', "Field should not be empty").notEmpty().trim();
            let error = req.validationErrors();
            if (error) {
                response.success = false;
                response.message = "Validation Error";
                response.error = error;
                return res.status(422).send(response)
            } else {
                let searchData = {
                    field: req.query.field
                };
                service.searchBookService(searchData, next).then(result => {
                    response.success = true;
                    response.message = result.message;
                    response.data = result.data;
                    return res.status(200).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.message = "Failed to search book!";
                    response.error = err;
                    return res.status(400).send(response);
                });
            }
        } catch (err) {
            next(err);
        }
    }

    /**
     * Purpose : Sort the books with price in max and min limit
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    sortAllBooksController(req, res, next) {
        let response = {};
        try {
            req.checkQuery("minPrice", "Minimum Price should not be empty").notEmpty().isNumeric().isLength({min: 1});
            req.checkQuery("maxPrice", "Maximum Price should not be empty").notEmpty().isNumeric().isLength({min: 1});

            let error = req.validationErrors();
            if (error) {
                response.success = false;
                response.message = "Validation Error";
                response.error = error;
                return res.status(422).send(response)
            } else {
                let filterByPrice = {
                    minPrice: req.query.minPrice,
                    maxPrice: req.query.maxPrice
                };
                service.sortAllBooksService(filterByPrice, next).then(result => {
                    response.success = true;
                    response.message = 'All books are sorted';
                    response.data = result;
                    return res.status(200).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.message = "Failed to sort books!";
                    response.error = err;
                    return res.status(400).send(response);
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BookController();