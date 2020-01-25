const mongoose = require('mongoose');
const mongoSchema = mongoose.Schema;

const cartSchema = new mongoSchema(
    {
        "userId": {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userDetails",
            require: true
        },
        "bookId": {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books",
            require: true
        },
        "orderId": {
            type: Number,
            require: true,
            unique: true
        }
    }, {
        timestamps: true
    });
const cartDetails = mongoose.model('bookDetails', cartSchema);

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