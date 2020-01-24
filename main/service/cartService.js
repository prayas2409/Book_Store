const model = require('../model/cartModel');
const orderModel = require('../model/bookModel');
const sendMail = require('../middleware/sendMail');

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
                let myId = {
                    _id: data.data.bookId
                }
                orderModel.update(myId)
                sendMail.sendEmailFunction(data,'sheetalbedarkar96@gmail.com')
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