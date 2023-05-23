require('dotenv').config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const UserService = require("../services/userService");
const AuthenticationService = require("../services/authenticationService");

class AuthenticationController {
    async login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const user = await UserService.getUser(username);
            if (!user) {
                return res.sendStatus(403);
            };

            if (user.password !== password) {
                return res.sendStatus(401);
            }

            const accessToken = AuthenticationService.generateAccessToken(user.username);
            const refreshToken = await AuthenticationService.generateRefreshToken(user.username, user.id);
            await AuthenticationService.storeToken(user.id, refreshToken);
            res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: AuthenticationService.REFRESH_TOKEN_EXPIRY_TIME()*1000 });
            res.status(200).json({
                data: {
                    accessToken,
                    username
                }
            });

        } catch(err) {
            console.log(err);
            res.sendStatus(404);
        };
    };

    async logout(req, res) {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(204);
        }

        const refreshToken = cookies.jwt;
        res.clearCookie('jwt', {httpOnly: true });

        const username = req.params.username;
        const userID = await UserService.getUserID(username);
        if (!userID) {
            return res.sendStatus(403);
        }
        await AuthenticationService.deleteRefreshToken(refreshToken);
        res.sendStatus(204);
    }

    async handleRefreshToken(req, res) {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(401);
        }
        const refreshToken = cookies.jwt;

        const userID = await AuthenticationService.findUserIDByToken(refreshToken);
        if (!userID) {
            return res.sendStatus(403);
        }
        const user = await UserService.findUserByID(userID);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || user.username !== decoded.username) {
                console.log("Decoding Error!");
                return res.sendStatus(403);
            }
            const accessToken = AuthenticationService.generateAccessToken(decoded.username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: AuthenticationService.ACCESS_TOKEN_EXPIRY_TIME });
            res.status(200).json({
                data: {
                    accessToken
                }
            });

        })
    };

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401);
        };

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.username = user.username;
            next();
        })
    }
}

module.exports = new AuthenticationController();
