class Controller {
    addBookController(req, res) {
        req.checkBody("id", "Id should not be empty").notEmpty();
        req.checkBody('author', "Author should not be empty").notEmpty();
        req.checkBody('title', "Title should not be empty").notEmpty();
        req.checkBody('image', "Image should not be empty").notEmpty();
        req.checkBody('quantity', "Quantity should not be empty").notEmpty();
        req.checkBody('price', "Price should not be empty").notEmpty();
        req.checkBody('description', "Description should not be empty").notEmpty();

        let error = req.validationErrors();
        let response = {};
        if (error) {
            response.status = false;
            response.error = error;
            return res.status(422).send(response)
        } else {
            response.status = true;
            response.message = "Book added successfully!";
            return res.status(200).send(response);
        }
    }
}

module.exports = new Controller();