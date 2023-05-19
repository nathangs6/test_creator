const UserService = require("../services/userService");

export default class UserController() {
    async login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const user = await UserService.getUser(username);
            if (!user) {
                res.sendStatus(403);
            };

            if (user.password !== password) {
                res.sendStatus(403);
            }

            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async changePassword(req, res) {
        try {
            const username = req.params.username;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            const confirmPassword = req.body.confirmPassword;

            if (newPassword !== confirmPassword) {
                res.sendStatus(403);
            }

            const user = await UserService.getUser(username);
            if (!user) {
                res.sendStatus(403);
            };

            if (user.password !== oldPassword) {
                res.sendStatus(403);
            };

            await UserService.changePassword(username, oldPassword, newPassword, confirmPassword);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async createUser(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const confirmPassword = req.body.confirmPassword;

            const userExists = await UserService.userExists(username);
            if (userExists) {
                res.sendStatus(401);
            };

            if (password !== confirmPassword) {
                res.sendStatus(403);
            };

            await UserService.createUser(username, password, confirmPassword);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };
};
