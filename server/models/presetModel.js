const db = require("../db");
const { renameKey } = require("./formatData.js");

export default class PresetModel() {
    async getPresets(userID) {
        const presetQueryResults = await db.query(
            "SELECT PresetID, Name, Preamble, Sep, Postamble " + 
            "FROM Preset " + 
            "WHERE UserAccountID = $1",
            [userID]
        );
        presetsData = presetQueryResults.rows;
        for (var i = 0; i < presetsData.length; i++) {
            renameKey(presetsData[i], "presetid", "id");
        };
        return presetsData;
    };

    async createPreset(userID, name, preamble, sep, postamble) {
        const presetCreation = await db.query(
            "INSERT INTO Preset (Name, Preamble, Sep, Postamble, UserAccountID) " + 
            "VALUES ($1, $2, $3, $4, $5) ",
            [name, preamble, sep, postamble, userID]
        );
    };

    async updatePreset(presetID, name, preamble, sep, postamble) {
        await db.query(
            "UPDATE Preset SET " +
            "Name = $1" +
            "Preamble = $2" + 
            "Sep = $3" + 
            "Postamble = $4" +
            "WHERE PresetID = $5",
            [name, preamble, sep, postamble, presetID]);
    };

    async deletePreset(presetID) {
        await db.query(
            "DELETE FROM Preset " + 
            "WHERE PresetID = $1",
            [presetID]
        );
    };
};
