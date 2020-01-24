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
            let error = req.validationErrors();
            if (error) {
                response.success = false;
                response.message = "Validation Error";
                response.error = error;
                return res.status(422).send(response)
            } else {
                let filterData = {
                    "userId": req.body.userId,
                    "bookId": req.body.bookId
                };
                service.addCartService(filterData).then(result => {
                    response.success = true;
                    response.message = "oder placed Successfully!";
                    response.data = result.data;
                    return res.status(200).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.message = "Failed to placed oder!";
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