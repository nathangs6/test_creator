// users.js - Users route module
// import modules
const express = require("express");
const UserController = require("../../controllers/userController");

// define constants
const router = express.Router();

// define routes
router.post("/login", UserController.login);
router.post("/create", UserController.createUser);
router.put("/changepassword/:username", UserController.changePassword);

module.exports = router;
