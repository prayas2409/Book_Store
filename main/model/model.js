const mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;

const bookSchema = new mongoSchema(
    {
        "id": {
            type: String,
            require: [true, "id is required"],
            unique: true
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
            min: 0,
            require: [true, "quantity is required"]
        },
        "price": {
            type: Number,
            min: 0,
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

class Model {

    create(req, callback, next) {
        try {
            let bookAdd = new books(req);
            bookAdd.save((err, data) => {
                if (err) {
                    return callback({message: "Failed to add book!", error: err});
                } else {
                    return callback(null, {message: "Book Added Successfully!", result: data});
                }
            });
        } catch (err) {
            return next(err);
        }
    }

    read(field, callBack, next) {
        try {
            books.find(field.find, {}, field.query, (err, result) => {
                if (err) {
                    return callBack(err);
                } else {
                    if (result.length == 0) {
                        return callBack(null, {message: "Book Not Found", data: result});
                    } else {
                        return callBack(null, {message: "Books Found", data: result});
                    }
                }
            });
        } catch (err) {
            return next(err);
        }
    }

}

module.exports = new Model();


