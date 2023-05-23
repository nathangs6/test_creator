const db = require("../db");
const { renameKey } = require("./formatData.js");

class PresetModel {
    async getPresets(userID) {
        const presetQueryResults = await db.query(
            "SELECT * " + 
            "FROM Preset " + 
            "INNER JOIN JunctionUserAccountPreset " +
            "ON Preset.PresetID = JunctionUserAccountPreset.PresetID " +
            "WHERE JunctionUserAccountPreset.UserAccountID = $1",
            [userID]
        );
        const presetsData = presetQueryResults.rows;
        for (var i = 0; i < presetsData.length; i++) {
            renameKey(presetsData[i], "presetid", "id");
        };
        return presetsData;
    };

    async getPreset(presetID) {
        try {
            const presetQuery = await db.query(
                "SELECT * FROM Preset WHERE PresetID = $1",
                [presetID]
            );
            const preset = presetQuery.rows[0];
            renameKey(preset, "presetid", "id");
            return preset;
        } catch(err) {
            console.log(err);
            return null;
        };
    };

    async createPreset(name, preamble, sep, postamble) {
        const presetCreation = await db.query(
            "INSERT INTO Preset (Name, Preamble, Sep, Postamble) " + 
            "VALUES ($1, $2, $3, $4) " + 
            "RETURNING *",
            [name, preamble, sep, postamble]
        );
        const newPreset = presetCreation.rows[0];
        renameKey(newPreset, "presetid", "id");
        return newPreset;
    };

    async updatePreset(presetID, name, preamble, sep, postamble) {
        const presetEdit = await db.query(
            "UPDATE Preset SET " +
            "Name = $1, " +
            "Preamble = $2, " + 
            "Sep = $3, " + 
            "Postamble = $4 " +
            "WHERE PresetID = $5 " + 
            "RETURNING *",
            [name, preamble, sep, postamble, presetID]);
        const updatedPreset  = presetEdit.rows[0];
        renameKey(updatedPreset, "presetid", "id");
        return updatedPreset;
    };

    async deletePreset(presetID) {
        await db.query(
            "DELETE FROM Preset " + 
            "WHERE PresetID = $1",
            [presetID]
        );
    };

    async cleanPresets() {
        try {
            await db.query(
                "DELETE FROM Preset " + 
                "WHERE NOT EXISTS (" + 
                "SELECT 1 FROM JunctionUserAccountPreset " + 
                "WHERE PresetID = Preset.PresetID" + 
                ")"
            );
        } catch(err) {
            console.log(err);
        };
    };
};

module.exports = new PresetModel();
