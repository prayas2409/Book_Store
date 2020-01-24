let service = require('../service/cartService');

class CartController {

    /**
     * purpose : add cart in database.
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    addCartController(req, res, next) {
        let response = {};
        try {
            req.checkBody('price', "Price should not be empty").notEmpty().trim();
            req.checkBody('quantity', "quantity should not be empty").notEmpty().trim();

            let error = req.validationErrors();
            if (error) {
                response.success = false;
                response.message = "Validation Error";
                response.error = error;
                return res.status(422).send(response)
            } else {
                let filterData = {
                    "userId": req.body.userId,
                    "bookId": req.body.bookId,
                    "price": req.body.price,
                    "quantity": req.body.quantity,
                };
                service.addCartService(filterData).then(result => {
                    response.success = true;
                    response.message = "Cart Added Successfully!";
                    response.data = result.data;
                    return res.status(200).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.message = "Failed to add Cart!";
                    response.error = err;
                    return res.status(400).send(response);
                })
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CartController();