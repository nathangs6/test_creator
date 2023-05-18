// users.js - Users route module
const express = require("express");
const db = require("../db");
const router = express.Router();
const { getUserID, verifyLogin } = require("./scripts/user.js");
const { renameKey } = require("./scripts/formatData.js");

// define routes
router.post("/login", async (req, res) => {
    inputtedUsername = req.body.username;
    inputtedPassword = req.body.password;
    try {
        const loginResult = await verifyLogin(inputtedUsername, inputtedPassword);
        if (loginResult.status === "fail") {
            res.status(401).json({
                status: loginResult.status,
                data: {result: loginResult.message}
            });
            return res;
        };

        res.status(200).json({
            status: "success",
            data: {result: "Logged in!"}
        });
    } catch (err) {
        console.log(err);
    }
});

router.post("/changepassword/:username", async (req, res) => {
    username = req.params.username;
    oldPassword = req.body.oldPassword;
    newPassword = req.body.newPassword;
    confirmPassword = req.body.confirmPassword;

    loginResult = await verifyLogin(username, oldPassword);
    if (loginResult.status === "fail") {
        res.status(401).json({
            status: loginResult.status,
            data: {result: loginResult.message}
        });
        return res;
    };

    if (newPassword !== confirmPassword) {
        res.status(401).json({
            status: "fail",
            data: {result: "Confirm password doesn't match!"}
        });
        return res;
    };

    const results = await db.query(
        "UPDATE UserAccount " + 
        "SET Password = $1 " + 
        "WHERE Username = $2", 
        [newPassword, username]
    );
    res.status(200).json({
        status: "success",
        data: {result: "Password successfully changed"}
    });
});

router.post("/create", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(username);

    const usernameExists = await getUserID(username);
    console.log(usernameExists);

    if (usernameExists != false) {
        res.status(401).json({
            status: "fail",
            data: {
                result: "Username already exists!"
            }
        });
        return res;
    };

    if (password !== confirmPassword) {
        res.status(401).json({
            status: "fail",
            data: {
                result: "Passwords do not match!"
            }
        });
        return res;
    };

    const results = await db.query(
        "INSERT INTO UserAccount " + 
        "(Username, Password) " + 
        "VALUES ($1, $2)",
        [username, password]
    );

    res.status(200).json({
        status: "success",
        data: {
            result: "Account created!"
        }
    });
    return res;
});

module.exports = router;
