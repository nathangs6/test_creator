// preset.js - Preset route module
// import modules
const express = require("express");
const PresetController = require("../controllers/presetController");

// define constants
const router = express.Router();

// define routes
router.get("/:username", PresetController.getPresets);
router.post("/:username", PresetController.createPreset);
router.put("/:presetID", PresetController.updatePreset);
router.delete("/:presetID", PresetController.deletePreset);

module.exports = router;
