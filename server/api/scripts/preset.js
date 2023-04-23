const db = require("../../db");
const { renameKey } = require("./formatData.js");

async function getUserPresets(userID) {
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

module.exports = { getUserPresets };
