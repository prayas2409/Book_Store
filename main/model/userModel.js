const mongoose = require('mongoose');
const mongoSchema = mongoose.Schema;

const userSchema = new mongoSchema(
    {
        "bookId": {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books"

            // type: Number,
            // require: [true, "BookId is required"],
            // unique: true
        },
        "userName": {
            type: String,
            require: [true, "name is required"],
        },
        "phoneNumber": {
            type: Number,
            require: [true, "Phone Number is required"]
        },
        "pinCode": {
            type: Number,
            require: [true, "PinCode is required"]
        },
        "locality": {
            type: String,
            require: [true, "locality is required"]
        },
        "address": {
            type: String,
            require: [true, "address is required"]
        },
        "cityTown": {
            type: String,
            require: [true, "cityTown is required"]
        },
        "landmark": {
            type: String,
            require: [true, "landmark is required"]
        },
        "type": {
            type: String,
            require: [true, "type is required"]
        }
    }, {
        timestamps: true
    });
const userDetails = mongoose.model('userDetails', userSchema);

class UserModel {
    /**
     * purpose : crate document in user database.
     * @param req
     * @param next
     * @returns {*}
     */
    create(req, next) {
        try {
            return new Promise((resolve, reject) => {
                let userAdd = new userDetails(req);
                userAdd.save().then(result => {
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

module.exports = new UserModel();