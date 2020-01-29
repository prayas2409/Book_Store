const mongoose = require("mongoose");
const mongoSchema = mongoose.Schema;

const bookSchema = new mongoSchema(
    {
        "id": {
            type: String,
            require: [true, "id is required"],
        },
        "author": {
            type: String,
            min: [3, 'Too small'],
            max: [20, 'To large'],
            require: [true, "author is required"]
        },
        "title": {
            type: String,
            min: [5, 'Too small'],
            max: [40, 'To large'],
            require: [true, "title is required"]
        },
        "image": {
            type: String,
            require: [true, "image is required"]
        },
        "quantity": {
            type: Number,
            min: 1,
            require: [true, "quantity is required"]
        },
        "price": {
            type: Number,
            min: 1,
            require: [true, "price is required"]
        },
        "description": {
            type: String,
            require: [true, "description is required"]
        }
    }, {
        timestamps: true
    });
const books = mongoose.model('books', bookSchema);

class BookModel {

    /**
     * Purpose : create data base.
     * @param req
     * @param next
     * @returns {*}
     */
    create(req, next) {
        try {
            return new Promise((resolve, reject) => {
                let bookAdd = new books(req);
                bookAdd.save().then(result => {
                    resolve({data: result});
                }).catch(err => {
                    reject({error: err});
                })
            });
        } catch (err) {
            return next(err);
        }
    }

    /**
     * Purpose : Read all data from database.
     * @param req
     * @param next
     * @returns {*}
     */
    read(req, next) {
        try {
            return new Promise((resolve, reject) => {
                books.find(req.find).then(result => {
                    if (result.length == 0) {
                        resolve({message: "Book Not Found", data: result});
                    } else {
                        resolve({message: "Books Found", data: result});
                    }
                }).catch(err => {
                    reject(err);
                })
            });
        } catch (err) {
            return next(err);
        }
    }

    /**
     * purpose : Update data into database
     * @param req
     * @param next
     * @returns {*}
     */
    update(req, next) {
        try {
            return new Promise((resolve, reject) => {
                books.update(req, {$inc: {'quantity': -1}}).then(result => {
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

module.exports = new BookModel();


