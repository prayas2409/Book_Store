let service = require('../service/userService');

class UserController {

    /**
     * Purpose : add user in user data base with selected book id to buy.
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    addUserController(req, res, next) {
        let responses = {};
        try {
            req.checkBody('userName', "userName should not be empty").notEmpty();
            req.checkBody('phoneNumber', "mobile number should not be empty").notEmpty();
            req.checkBody('pinCode', "pinCode should not be empty").notEmpty();
            req.checkBody('locality', "locality should not be empty").notEmpty();
            req.checkBody('address', "address should not be empty").notEmpty();
            req.checkBody('email', "email should not be empty").notEmpty();
            req.checkBody('cityTown', "cityTown should not be empty").notEmpty();
            req.checkBody('landmark', "landmark should not be empty").notEmpty();
            req.checkBody('type', "type should not be empty").notEmpty();

            let error = req.validationErrors();
            if (error) {
                responses.success = false;
                responses.message = "Validation Error";
                responses.error = error;
                return res.status(422).send(responses)
            } else {
                let filterData = {
                    "bookId": req.body.bookId,
                    "userName": req.body.userName,
                    "phoneNumber": req.body.phoneNumber,
                    "pinCode": req.body.pinCode,
                    "locality": req.body.locality,
                    "address": req.body.address,
                    "email": req.body.email,
                    "cityTown": req.body.cityTown,
                    "landmark": req.body.landmark,
                    "type": req.body.type
                };
                service.addUserService(filterData).then(result => {
                    responses.success = true;
                    responses.message = "User Added Successfully!";
                    responses.data = result.data;
                    return res.status(200).send(responses);
                }).catch((err) => {
                    responses.success = false;
                    responses.message = "Failed to add User!";
                    responses.error = err;
                    return res.status(400).send(responses);
                })
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();