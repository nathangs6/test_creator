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
        };

    async login(username, inputtedPassword) {
        const user = getUser(username);
        if (!user) {
            res.sendStatus(403);
        }

        if (user.password !== inputtedPassword) {
            res.sendStatus(403);
        };

        res.sendStatus(200);
    };

    async createUser(username, password, confirmPassword) {
        if (password !== confirmPassword) {
            return res.sendStatus(403);
        }

        usernameExists = getUserID(username);
        if (usernameExists) {
            return res.sendStatus(403);
        }

        await UserModel.createUser(username, password);
        res.sendStatus(200);
    };

    async changePassword(username, oldPassword, newPassword, confirmPassword) {
        if (newPassword !== confirmPassword) {
            return res.sendStatus(403);
        }

        loggedIn = await login(username, oldPassword);
        if (!loggedIn) {
            return res.sendStatus(403);
        }

        await UserModel.changePassword(username, newPassword);
    };
};
