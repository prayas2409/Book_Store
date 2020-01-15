let service = require('../service/service')

class Controller {
    getAllBooksController(req, res) {
        let find = {};
        let response = {
            success: false,
            message: "Error while displaying all books",
            data: {}
        };
        try {
            service.getAllBooksService(find, (err, result) => {
                if (err) {
                    response.message = err;
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.message = 'All books are covered';
                    response.data = result;
                    return res.status(200).send(response);
                }
            })
        } catch (err) {
            response.success = false;
            response.error = err;
            return res(response);
        }
    }
}

module.exports = new Controller();