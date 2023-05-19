// preset.js - Preset route module
// import modules
const express = require("express");
const PresetService = require("../services/presetService.js");

// define constants
const router = express.Router();

// define routes
router.get("/:username", async (req, res) => {
    try {
        userID = await getUserID(req.params.username);
        await PresetService.getPresets(username);
    } catch(err) {
        console.log(err);
    };
});

router.post("/new/:username", async (req, res) => {
    // Creates a new preset
    try {
        const username = req.params.username;
        const presetData = {
            name: req.body.newPresetName;
            preamble: req.body.newPresetPreamble;
            sep: req.body.newPresetSep;
            postamble: req.body.newPresetPostamble;
        }
        await PresetService.createPreset(username, presetData);
    } catch (err) {
        console.log(err);
    };
});


router.put("/update/:presetID", async (req, res) => {
    try {
        const presetID = req.params.presetID;
        const updateData = {
            name: req.body.newPresetName,
            preamble: req.body.newPresetPreamble,
            sep: req.body.newPresetSep,
            postamble: req.body.newPresetPostamble
        };
        await PresetService.updatePreset(presetID, updateData);
    } catch (err) {
        console.log(err);
    };
});

router.delete("/delete/:presetID", async (req, res) => {
    try {
        const presetID = req.params.presetID;
        await PresetService.deletePreset(presetID);
    } catch(err) {
        console.log(err);
    };
});

module.exports = router;
