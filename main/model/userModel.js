const mongoose = require('mongoose');
const mongoSchema = mongoose.Schema;

const userSchema = new mongoSchema(
    {
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
        "password": {
            type: String,
            require: [true, "Password is required"]
        },
        "email": {
            type: String,
            require: [true, "email is required"]
        },
        "cityTown": {
            type: String,
            require: [true, "cityTown is required"]
        },
        "landmark": {
            type: String,
            require: [true, "landmark is required"]
        },
        // "type": {
        //     type: String,
        //     enum: ['home', 'work', 'other'],
        //     default: 'home',
        // }
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

    read(req, next) {
        try {
            return new Promise((resolve, reject) => {
                userDetails.find({'userName': req.username}).then(result => {
                    if (result[0].password === req.password) {
                        resolve({message: "User Login Successfully", data: result});
                    } else {
                        reject({message: "Invalid Password"});
                    }
                }).catch(err => {
                    reject({message: "Invalid UserName", err: err});
                })
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new UserModel();