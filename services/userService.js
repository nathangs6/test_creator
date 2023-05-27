const UserModel = require("../models/userModel.js");
const PresetService = require("../services/presetService");
const CollectionService = require("../services/collectionService");
const SubCollectionService = require("../services/subCollectionService");
const QuestionService = require("../services/questionService");

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
        UserModel.deleteOtherUsers(allowedUserIDs);
    };

    async deleteUser(userID) {
        UserModel.deleteUser(userID);
        setTimeout(async () => { await PresetService.cleanPresets() }, 100);
        setTimeout(async () => { await CollectionService.cleanCollections() }, 150);
        setTimeout(async () => { await SubCollectionService.cleanSubCollections() }, 200);
        setTimeout(async () => { await QuestionService.cleanQuestions() }, 250);
    };
};

module.exports = new UserService();
