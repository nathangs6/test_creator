const AuthenticationService = require("../services/authenticationService");
const UserService = require("../services/userService");

class UserController {
    async changePassword(req, res) {
        try {
            const username = req.body.username;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            
            const user = await UserService.getUser(username);
            if (!user) {
                return res.sendStatus(403);
            };

            if (username === "") {
                return res.sendStatus(401);
            }

            const correctPassword = await AuthenticationService.verifyLogin(user, oldPassword);
            if (!correctPassword) {
                return res.sendStatus(401);
            };

            await UserService.changePassword(username, newPassword);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async createUser(req, res) {
        console.log("Hello");
        try {
            console.log(req);
            const username = req.body.username.trim();
            const password = req.body.password;

            const userExists = await UserService.userExists(username);
            if (userExists || username === "") {
                return res.sendStatus(403);
            };

            const hashedPassword = await AuthenticationService.hashPassword(password);
            console.log(hashedPassword);

            await UserService.createUser(username, hashedPassword);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async deleteUser(req, res) {
        try {
            const username = req.params.username;
            const password = req.body.password;


            const user = await UserService.getUser(username);
            if (!user) {
                return res.sendStatus(403);
            };
            
            if (!AuthenticationService.verifyLogin(user, password)) {
                return res.sendStatus(401);
            };

            await UserService.deleteUser(user.id);
            return res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };
};

module.exports = new UserController();
