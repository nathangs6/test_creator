require("dotenv").config(); // use environment variables
const cors = require("cors");
const express = require("express") // import the express app
const db = require("./db"); // import the database files
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { getUserID, verifyLogin } = require("./api/scripts/user.js");
const { userHasRefreshToken, validateRefreshToken, deleteRefreshToken, deleteRefreshTokenByID } = require("./api/scripts/authentication.js");

// import route modules

const app = express(); // create instance of express and store it in app

// Use the express.json() middleware to allow reading req.body
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// helper functions

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
};

async function generateRefreshToken(user, userID) {
    const hasToken = await userHasRefreshToken(userID);
    if (hasToken == true) {
        await deleteRefreshTokenByID(userID);
    }
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

// Define routes
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Attempting to login " + username);
    const loginResult = await verifyLogin(username, password);
    if (loginResult.status === "fail") {
        return res.status(401).json({
            status: loginResult.status,
            data: {message: loginResult.message}
        });
    }

    const user = { username };

    console.log("Generating tokens for " + username);
    const userID = await getUserID(username);
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user, userID);
    const lastLoginDate = new Date();
    const refreshExpiryDate = new Date(lastLoginDate);
    refreshExpiryDate.setDate(lastLoginDate.getDate() + 7);
    await db.query("INSERT INTO ClientAuthentication" +
                    "(LastLogin, RefreshToken, RefreshTokenExpiry, UserAccountID) " +
                    "VALUES ($1, $2, $3, $4)", [lastLoginDate.toISOString(), refreshToken, refreshExpiryDate.toISOString(), userID])
    console.log("Inserted!");
    res.status(200).json({
        status: "success",
        data: {
            accessToken,
            refreshToken
        }
    });
});

app.post('/token', async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        return res.sendStatus(401);
    }
    const tokenValidated = refreshToken && await validateRefreshToken(refreshToken);
    if (tokenValidated == false) {
        return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = generateAccessToken({ username: user.username });
        return res.json({accessToken});
    });
});

app.delete('/logout', async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        res.sendStatus(204);
    }
    await deleteRefreshToken(refreshToken);
    res.sendStatus(204);
});

// tell express app to listen on a specific port
const port = process.env.AUTHPORT;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});
