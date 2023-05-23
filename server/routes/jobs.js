const express = require("express");
const JobController = require("../controllers/jobController.js");

const router = express.Router();

router.get("/", JobController.resetDB);

module.exports = router;
