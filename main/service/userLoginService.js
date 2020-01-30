const userModel = require('../model/userModel');

class UserLoginService {
    loginUserService(data, next) {
        try {
            return userModel.read(data).then(data => {
                console.log(data)
                return data;
            }).catch(err => {
                console.log(err);
                return err;
            })
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new UserLoginService();

