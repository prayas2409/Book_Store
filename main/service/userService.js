const userModel = require('../model/userModel');

class UserService {
    /**
     * purpose: add documents user in data base.
     * @param data
     * @param next
     * @returns {Promise<>|*}
     */
    addUserService(data, next) {
        try {
            return userModel.create(data).then(data => {
                return data;
            }).catch(err => {
                return err;
            })
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new UserService();