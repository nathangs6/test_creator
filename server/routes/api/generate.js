const express = require("express");
const GenerateController = require("../../controllers/generateController");
const router = express.Router();

router.post("/:username", GenerateController.generateTest);
router.get("/:username", GenerateController.downloadTest);

module.exports = router;
