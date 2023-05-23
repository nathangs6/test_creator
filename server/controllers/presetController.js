const UserService = require("../services/userService");
const PresetService = require("../services/presetService");

class PresetController {
    async getPresets(req, res) {
        try {
            const userID = await UserService.getUserID(req.params.username);
            if (!userID) {
                res.sendStatus(401);
                return null;
            };
            const presetData = await PresetService.getPresets(userID);
            res.status(200).json({
                data: {
                    presetData
                }
            });
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async createPreset(req, res) {
        try {
            const username = req.params.username;
            const newPresetData = {
                name: req.body.newPresetName,
                preamble: req.body.newPresetPreamble,
                sep: req.body.newPresetSep,
                postamble: req.body.newPresetPostamble
            }
            const userID = await UserService.getUserID(req.params.username);
            if (!userID) {
                res.sendStatus(401);
                return null;
            };
            const presetData = await PresetService.createPreset(userID, newPresetData);
            res.status(200).json({
                data: {
                    presetData
                }
            });
            
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async updatePreset(req, res) {
        try {
            const presetID = req.params.presetID;
            const updateData = {
                name: req.body.newPresetName,
                preamble: req.body.newPresetPreamble,
                sep: req.body.newPresetSep,
                postamble: req.body.newPresetPostamble
            };
            const presetData = await PresetService.updatePreset(presetID, updateData);
            res.status(200).json({
                data: {
                    presetData
                }
            });
            
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        };
    };

    async deletePreset(req, res) {
        try {
            const presetID = req.params.presetID;
            await PresetService.deletePreset(presetID);
            res.sendStatus(200);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        };
    };
};

module.exports = new PresetController();
