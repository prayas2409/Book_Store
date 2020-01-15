const mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
var bookSchema = new mongoSchema(
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
var books = mongoose.model('books', bookSchema);

class Model {

    read(field, callBack) {
        try {
            books.find(field, (err, result) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, result);
                }
            });
        } catch (err) {
            return callBack(err);
        }
    }

}

module.exports = new Model();

