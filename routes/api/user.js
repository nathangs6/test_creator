// users.js - Users route module
// import modules
const express = require("express");
const UserController = require("../../controllers/userController");

// define constants
const router = express.Router();

// define routes
router.post("/create", UserController.createUser);
router.put("/changepassword", UserController.changePassword);
router.put("/delete/:username", UserController.deleteUser);

module.exports = router;
