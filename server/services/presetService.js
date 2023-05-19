const PresetModel = require("../models/presetModel.js");

class PresetService {
    async getPresets(userID) {
        const presetData = await PresetModel.getPresets(userID);
        return presetData;
    };

    async createPreset(userID, presetData) {
        const newPreset = await PresetModel.createPreset(userID, presetData.name, presetData.preamble, presetData.sep, presetData.postamble);
        return newPreset;
    };

    async updatePreset(presetID, updateData) {
        return await PresetModel.updatePreset(presetID, updateData.name, updateData.preamble, updateData.sep, updateData.postamble);
    };

    async deletePreset(presetID) {
        await PresetModel.deletePreset(presetID);
    };
};

module.exports = new PresetService();
