require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AuthenticationModel = require("../models/authenticationModel");

const saltRounds = 10;

class AuthenticationService {
    ACCESS_TOKEN_EXPIRY_TIME() {
        return 15 * 60;
    }
    REFRESH_TOKEN_EXPIRY_TIME() {
        return 1 * 24 * 60 * 60;
    }

    async verifyLogin(user, password) {
        const correctPassword = await bcrypt.compare(password, user.password);
        return correctPassword;
    };

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt);
        return hash;
    };

    generateAccessToken(username) {
        const user = { username };
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: this.ACCESS_TOKEN_EXPIRY_TIME() });
    };

    async generateRefreshToken(username, userID) {
        const user = { username };
        const hasToken = await AuthenticationModel.userHasRefreshToken(userID);
        if (hasToken == true) {
            await AuthenticationModel.deleteUserTokens(userID);
        }
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: this.REFRESH_TOKEN_EXPIRY_TIME() });
    };

    async storeToken(userID, refreshToken) {
        const lastLogin = new Date();
        const refreshTokenExpiry = new Date(lastLogin);
        refreshTokenExpiry.setDate(lastLogin.getDate() + this.REFRESH_TOKEN_EXPIRY_TIME() / (24*60*60));
        await AuthenticationModel.createToken(lastLogin.toISOString(), refreshToken, refreshTokenExpiry.toISOString(), userID);
    }

    async deleteRefreshToken(refreshToken) {
        await AuthenticationModel.deleteRefreshToken(refreshToken);
    }

    async findUserIDByToken(refreshToken) {
        const user = await AuthenticationModel.getClientByToken(refreshToken);
        return user.id;
    };
};

module.exports = new AuthenticationService();
