let service = require('../service/service')

class Controller {
    getAllBooks(req, res) {
        let find = {};
        service.getAllBooks(find, (err, result) => {
            let response = {
                success: false,
                message: "Error while displaying all books",
                data: {}
            }
            if (err) {
                response.message = err;
                return res.status(400).send(response);
            } else {
                response.success = true,
                    response.message = 'All books are covered',
                    response.data = result;
                return res.status(200).send(response);
            }
        })
    }
}

module.exports = new Controller();