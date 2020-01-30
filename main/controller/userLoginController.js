let service = require('../service/userLoginService');

class UserLoginController {
    loginUserController(req, res, next) {
        let response = {};
        try {
            let error = req.validationErrors();
            if (error) {
                response.success = false;
                response.message = "Validation Error";
                response.error = error;
                return res.status(422).send(response)
            } else {
                let searchData = {
                    "username": req.body.username,
                    "password": req.body.password
                };
                service.loginUserService(searchData).then(result => {
                    response.success = true;
                    response.message = result.message;
                    response.data = result.data;
                    return res.status(200).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.message = "Failed to login!";
                    response.error = err;
                    return res.status(404).send(response);
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserLoginController();