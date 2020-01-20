let service = require('../service/service');

class Controller {

    addBookController(req, res, next) {
        let response = {};
        try {
            req.checkBody("id", "Id should not be empty").notEmpty().isInt().isLength({min: 1});
            req.checkBody('author', "Author should not be empty").notEmpty();
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
                service.addBookService(filterData).then(result => {
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

    getAllBooksController(req, res, next) {
        // console.log("req",req.query.pageNo);
        let find = {};
        let response = {};
        try {
            // req.checkQuery("pageNo", "Page Number should not be empty").notEmpty().isNumeric().isLength({min: 1});
            // let error = req.validationErrors();
            // if (error) {
            //     response.success = false;
            //     response.message = "Validation Error";
            //     response.data = error;
            //     return res.status(422).send(response)
            // } else {
                let getBooks = {
                    find,
                    // pageNo: parseInt(req.query.pageNo)
                };
                service.getAllBooksService(getBooks).then(result => {
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
            // }
        } catch (err) {
            next(err);
        }
    }

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
                service.searchBookService(searchData).then(result => {
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

    sortAllBooksController(req, res, next) {
        let response = {};
        try {
            // req.checkQuery("pageNo", "Page Number should not be empty").notEmpty().isNumeric().isLength({min: 1});
            req.checkBody("minPrice", "Minimum Price should not be empty").notEmpty().isNumeric().isLength({min: 1});
            req.checkBody("maxPrice", "Maximum Price should not be empty").notEmpty().isNumeric().isLength({min: 1});

            let error = req.validationErrors();
            if (error) {
                response.success = false;
                response.message = "Validation Error";
                response.error = error;
                return res.status(422).send(response)
            } else {
                let filterByPrice = {
                    // pageNo: parseInt(req.query.pageNo),
                    minPrice: req.body.minPrice,
                    maxPrice: req.body.maxPrice
                };
                service.sortAllBooksService(filterByPrice).then(result => {
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

module.exports = new Controller();