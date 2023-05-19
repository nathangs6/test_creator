// users.js - Users route module
// import modules
const express = require("express");
const UserService = require("../services/userService.js");

// define constants
const router = express.Router();

// define routes
router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await UserService.login(username, password);
});

router.put("/changepassword/:username", async (req, res) => {
    const username = req.params.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    await UserService.changePassword(username, oldPassword, newPassword, confirmPassword);
});

router.post("/create", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    await UserService.createUser(username, password, confirmPassword);
});

module.exports = router;
