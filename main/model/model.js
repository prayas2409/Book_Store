const mongoose = require("mongoose");
const mongoSchema = mongoose.Schema;

const bookSchema = new mongoSchema(
    {
        "id": {
            type: String,
            require: [true, "id is required"],
            unique: true
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
            require: [true, "quantity is required"]
        },
        "price": {
            type: String,
            require: [true, "price is required"]
        },
        "description": {
            type: String
        },
    },
    {
        timestamps: true
    });

const books = mongoose.model('books', bookSchema);

class Model {

    create(req, callback) {
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
            return callback(err);
        }
    }

}

module.exports = new Model();