const UserService = require("../models/questionService.js");
const PresetModel = require("../models/presetModel.js");

export default class PresetService() {
    async getPresets(username) {
        const userID = UserService.getUserID(username);
        if (!userID) {
            res.sendStatus(401);
            return null;
        };
        const presetData = await PresetModel.getPresets(userID);
        res.status(200).json({
            data: {
                presetData
            }
        });
    };

    async createPreset(username, presetData) {
        const userID = await UserService.getUserID(username);
        if (!userID) {
            res.sendStatus(401);
            return null;
        };
        await PresetModel.createPreset(userID, presetData.name, presetData.preamble, presetData.sep, presetData.postamble);
        res.sendStatus(200);
    };

    async updatePreset(presetID, updateData) {
        await PresetModel.updatePreset(presetID, updateData.name, updateData.preamble, updateData.sep, udpateData.postamble);
        res.sendStatus(200);
    };

    async deletePreset(presetID) {
        await PresetModel.deletePreset(presetID);
        res.sendStatus(200);
    };
};
