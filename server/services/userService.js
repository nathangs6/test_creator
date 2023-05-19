const UserModel = require("../models/userModel.js");

export default class UserService() {
    async getUserID(username) {
        try {
            const user = await UserModel.getUser(username);
            if (!user) {
                return null
            };
            return user.id;
        } catch(err) {
            console.log(err)
            return null;
        }
    };

    async getUser(username) {
        try {
            const user = await UserModel.getUser(username);
            if (!user) {
                return null
            };
            return user;
        } catch(err) {
            console.log(err);
            return null;
        };
    };

    async userExists(username) {
        const user = getUser(username);
        if (!user) {
            return false;
        };
        return true;
    };

    async createUser(username, password, confirmPassword) {
        await UserModel.createUser(username, password);
    };

    async changePassword(username, oldPassword, newPassword, confirmPassword) {
        await UserModel.changePassword(username, newPassword);
    };
};
