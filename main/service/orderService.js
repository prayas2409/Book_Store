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
            let orderId = Math.floor(Math.random() * 100000);
            let filterData={
                userId :data.userId,
                bookId :data.bookId,
                orderId:orderId
            };
            return orderModel.create(filterData).then(data => {;
                return data;
            }).catch(err => {
                return err;
            })
        } catch (err) {
            return next(err);
        }
    }

    quantityUpdate(data, next){
        try{
        bookModel.update(data).then(response =>{
            return response;
        }).catch(err =>{
            return err;
        })
        }catch (err) {
            return next(err);
        }
    }

}

module.exports = new CartService();