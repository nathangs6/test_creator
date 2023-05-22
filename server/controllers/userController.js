const UserService = require("../services/userService");

class UserController {
    async changePassword(req, res) {
        try {
            const username = req.body.username;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            
            const user = await UserService.getUser(username);
            if (!user) {
                res.sendStatus(403);
                return null;
            };

            if (user.password !== oldPassword) {
                res.sendStatus(401);
                return null;
            };

            await UserService.changePassword(username, newPassword);
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

            const userExists = await UserService.userExists(username);
            if (userExists) {
                res.sendStatus(403);
                return null;
            };

            await UserService.createUser(username, password);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };
};

module.exports = new UserController();
