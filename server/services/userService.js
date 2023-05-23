const UserModel = require("../models/userModel.js");

class UserService {
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

    async findUserByID(userID) {
        try {
            return await UserModel.getUserByID(userID);
        } catch(err) {
            console.log(err);
            return null;
        };
    };

    async userExists(username) {
        const user = await this.getUser(username);
        if (!user) {
            return false;
        };
        return true;
    };

    async createUser(username, password, confirmPassword) {
        await UserModel.createUser(username, password);
    };

    async changePassword(username, newPassword) {
        await UserModel.changePassword(username, newPassword);
    };

    async resetUsers(allowedUserIDs) {
        for (var idx = 0; idx < allowedUserIDs.length; idx++) {
            await UserModel.deleteUser(allowedUserIDs[idx])
        }
    }
};

module.exports = new UserService();
