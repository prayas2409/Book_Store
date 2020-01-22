const model = require('../model/cartModel');

class CartService {
    /**
     * purpose : crate document in cart database
     * @param data
     * @param next
     * @returns {*}
     */
    addCartService(data, next) {
        try {
            return model.create(data).then(data => {
                return data;
            }).catch(err => {
                return err;
            })
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new CartService();