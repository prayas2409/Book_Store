const mongoose = require("mongoose");
const mongoSchema = mongoose.Schema;
const bookSchema = new mongoSchema(
    {
        "id": {
            type: String,
            require: [true, "id is required"]
        },
        "author": {
            type: String,
            require: [true, "author is required"]
        },
        "title": {
            type: String,
            require: [true, "title is required"]
        },
        "image": {
            type: String
        },
        "quantity": {
            type: String,
        },
        "price": {
            type: String
        }, "description": {
            type: String,
        },
    },
    {
        timestamps: true
    });
const books = mongoose.model('books', bookSchema);

class Model {

    create(req, callback) {
        let bookAdd = new books(req)
        bookAdd.save((err, data) => {
            if (err) {
                return callback({message: "Failed to add book!", error: err});
            } else {
                return callback(null, {message: "Book Added Successfully!", result: data})
            }
        })
    }

    read(field, callBack) {
        books.find(field, (err, result) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, result);
            }
        })
    }

}

module.exports = new Model();