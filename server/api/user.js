// users.js - Users route module
const express = require("express");
const db = require("../db");
const router = express.Router();
const { getUserID, verifyLogin } = require("./scripts/user.js");
const { getUserPresets } = require("./scripts/preset.js");
const { getUserCollections } = require("./scripts/collection.js");
const { getCollectionSubCollections } = require("./scripts/subcollection.js");
const { getSubCollectionQuestions } = require("./scripts/question.js");
const { renameKey } = require("./scripts/formatData.js");

// define routes
router.get("/:username", async function (req, res) {
    // Function that retrieves all user data for the main page
    username = req.params.username;
    console.log(username);

    loginResult = "success";
    if (loginResult === "fail") {
        res.status(401).json({
            status: "failed",
            data: {result: "User does not exist"}
        });
        return 0;
    };

    userID = await getUserID(username);

    res.status(200).json({
        status: "success",
        data: {
        }
    });
});

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

module.exports = router;
