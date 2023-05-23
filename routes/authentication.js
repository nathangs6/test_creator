const express = require("express");
const AuthenticationController = require("../controllers/authenticationController.js");

const router = express.Router();

router.post("/login", AuthenticationController.login);
router.get("/logout/:username", AuthenticationController.logout);
router.get('/refresh', AuthenticationController.handleRefreshToken);
module.exports = router;
