const UserService = require("../models/questionService.js");
const PresetModel = require("../models/presetModel.js");

export default class PresetService() {
    async getPresets(userID) {
        const presetData = await PresetModel.getPresets(userID);
    };

    async createPreset(username, presetData) {
        await PresetModel.createPreset(userID, presetData.name, presetData.preamble, presetData.sep, presetData.postamble);
    };

    async updatePreset(presetID, updateData) {
        await PresetModel.updatePreset(presetID, updateData.name, updateData.preamble, updateData.sep, updateData.postamble);
    };

    async deletePreset(presetID) {
        await PresetModel.deletePreset(presetID);
    };
};
