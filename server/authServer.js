// import dependencies
require("dotenv").config(); // use environment variables
const cors = require("cors");
const express = require("express") // import the express app
const db = require("./db"); // import the database files
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { getUserID, verifyLogin } = require("./api/scripts/user.js");
const { userHasRefreshToken, validateRefreshToken, deleteRefreshToken, deleteRefreshTokenByID } = require("./api/scripts/authentication.js");

const authenticationRoutes = require("./routes/authentication");

// define constants
const app = express(); // create instance of express and store it in app
const ACCESS_TOKEN_EXPIRY_TIME = 60 // this is in seconds
const REFRESH_TOKEN_EXPIRY_TIME = 1 * 24 * 60 * 60 // this is in seconds

// Use the express.json() middleware to allow reading req.body
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// helper functions


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
    refreshExpiryDate.setDate(lastLoginDate.getDate() + (REFRESH_TOKEN_EXPIRY_TIME / (60 * 60 * 24)));
    await db.query("INSERT INTO ClientAuthentication" +
                    "(LastLogin, RefreshToken, RefreshTokenExpiry, UserAccountID) " +
                    "VALUES ($1, $2, $3, $4)", [lastLoginDate.toISOString(), refreshToken, refreshExpiryDate.toISOString(), userID])
    console.log("Inserted!");
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: REFRESH_TOKEN_EXPIRY_TIME * 1000 });
    res.json({ accessToken });
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
