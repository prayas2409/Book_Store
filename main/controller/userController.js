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
            req.checkBody('username', "Invalid userName")
                .isAlpha().notEmpty().isLength({min: 3});
            req.checkBody('password', "Invalid password")
                .isAlpha().notEmpty().isLength({min: 6});
            req.checkBody('mobile', "Invalid mobile number ")
                .notEmpty().isLength({min: 10, max: 10}).isNumeric();
            req.checkBody('pincode', " Invalid pinCode ")
                .notEmpty().isLength({min: 6, max: 6}).isNumeric();
            req.checkBody('locality', "Invalid locality")
                .isAlpha().notEmpty().isLength({min: 3});
            req.checkBody('address', "Invalid address")
                .isAlphanumeric().notEmpty().isLength({min: 3}).isString();
            req.checkBody('emailId', "Invalid email")
                .notEmpty().isEmail();
            req.checkBody('city', "Invalid cityTown")
                .isAlpha().notEmpty().isLength({min: 3});
            req.checkBody('landmark', "Invalid landmark")
                .isAlphanumeric().notEmpty().isLength({min: 3});
            // req.checkBody('type', "Invalid type").notEmpty();

            let error = req.validationErrors();
            if (error) {
                responses.success = false;
                responses.message = "Validation Error";
                responses.error = error;
                return res.status(422).send(responses)
            } else {
                let filterData = {
                    "userName": req.body.username,
                    "password": req.body.password,
                    "phoneNumber": req.body.mobile,
                    "pinCode": req.body.pincode,
                    "locality": req.body.locality,
                    "address": req.body.address,
                    "email": req.body.emailId,
                    "cityTown": req.body.city,
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
                    return res.status(404).send(responses);
                })
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();