const mongoose = require('mongoose');
const mongoSchema = mongoose.Schema;

const cartSchema = new mongoSchema(
    {
        "userId": {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userDetails"
        },
        "bookId": {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books"
        },
        "orderId": {
            type: Number,
            default: Math.floor(Math.random() * 100000),
            index: {unique: true}
        }
    }, {
        timestamps: true
    });
const cartDetails = mongoose.model('cartDetails', cartSchema);

class CartModel {
    /**
     * purpose : crate document in cart database.
     * @param req
     * @param next
     * @returns {*}
     */
    create(req, next) {
        try {
            return new Promise((resolve, reject) => {
                let cartAdd = new cartDetails(req);
                cartAdd.save().then(result => {
                    resolve({data: result});
                }).catch(err => {
                    reject({error: err});
                })
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new CartModel();