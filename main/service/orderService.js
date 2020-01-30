const orderModel = require('../model/orderModel');
const bookModel = require('../model/bookModel');

// const sendMail = require('../middleware/sendMail');

class CartService {
    /**
     * purpose : crate document in cart database to order success, send email to user and 1 quantity reduce from data of this particular data base.
     * @param data
     * @param next
     * @returns {*}
     */
    addOrderService(data, next) {
        try {

            let findBook = {
                find: {"_id": data.bookId}
            };
            return bookModel.read(findBook).then(result => {
                if (result.data[0].quantity > 0) {
                    let orderId = Math.floor(Math.random() * 100000);
                    let filterData = {
                        userId: data.userId,
                        bookId: data.bookId,
                        orderId: orderId
                    };
                    return orderModel.create(filterData).then(data => {
                        return data;
                    }).catch(err => {
                        return err;
                    })
                } else {
                    return {message: "Out Of Stock"};
                }
            })
        } catch (err) {
            return next(err);
        }
    }

    quantityUpdate(data, next) {
        try {
            bookModel.update(data).then(response => {
                return response;
            }).catch(err => {
                return err;
            })
        } catch (err) {
            return next(err);
        }
    }

}

module.exports = new CartService();