const db = require("../../db");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

async function userHasRefreshToken(userID) {
    const dbCall = await db.query(
        "SELECT * FROM ClientAuthentication WHERE UserAccountID=$1",
        [userID]);
    return dbCall.rows !== [];
};

async function validateRefreshToken(token) {
    const dbCall = await db.query(
        "SELECT * FROM ClientAuthentication WHERE RefreshToken=$1",
        [token]);
    return dbCall.rows !== [];
}

async function deleteRefreshToken(token) {
    const dbCall = await db.query(
        "DELETE FROM ClientAuthentication WHERE RefreshToken=$1", [token]);
}

async function deleteRefreshTokenByID(userID) {
    const dbCall = await db.query(
        "DELETE FROM ClientAuthentication WHERE UserAccountID=$1", [userID]);
};

module.exports = { authenticateToken, userHasRefreshToken, validateRefreshToken, deleteRefreshToken, deleteRefreshTokenByID }
