const db = require("../db");
const { renameKey } = require("./formatData");

class AuthenticationModel {
    async userHasRefreshToken(userID) {
        const dbCall = await db.query(
            "SELECT * FROM ClientAuthentication WHERE UserAccountID=$1",
            [userID]);
        return dbCall.rows.length !== 0;
    };

    async getClientByToken(token) {
        try {
            const dbCall = await db.query(
                "SELECT * FROM ClientAuthentication WHERE RefreshToken=$1",
                [token]);
            const clientRows = dbCall.rows;
            if (clientRows.length === 0) { 
                return null;
            }
            const client = clientRows[0];
            renameKey(client, "useraccountid", "id");
            return clientRows[0];
        } catch (err) {
            return null;
        };
    }

    async getUserTokens(userID) {
        const dbCall = await db.query(
            "SELECT * FROM ClientAuthentication WHERE UserAccountID=$1",
            [userID]);
        return dbCall.rows;
    }

    async createToken(lastLogin, refreshToken, refreshTokenExpiry, userID) {
        const dbCall = await db.query(
            "INSERT INTO ClientAuthentication " +
            "(LastLogin, RefreshToken, RefreshTokenExpiry, UserAccountID) " + 
            "VALUES ($1, $2, $3, $4)",
            [lastLogin, refreshToken, refreshTokenExpiry, userID]);
    };

    async deleteRefreshToken(token) {
        const dbCall = await db.query(
            "DELETE FROM ClientAuthentication WHERE RefreshToken=$1", [token]);
    };

    async deleteUserTokens(userID) {
        const dbCall = await db.query(
            "DELETE FROM ClientAuthentication WHERE UserAccountID=$1", [userID]);
    };
}

module.exports = new AuthenticationModel();
