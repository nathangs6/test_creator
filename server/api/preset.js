// subcollection.js - Collection route module
const express = require("express");
const db = require("../db");
const { getUserID } = require("./scripts/user.js");
const router = express.Router();

// define routes
router.post("/new/:username", async (req, res) => {
    // Creates a new preset
    try {
        userID = await getUserID(req.params.username);
        presetName = req.body.newPresetName;
        presetPreamble = req.body.newPresetPreamble;
        presetSep = req.body.newPresetSep;
        presetPostamble = req.body.newPresetPostamble;
        const presetCreation = await db.query(
            "INSERT INTO Preset (Name, Preamble, Sep, Postamble, UserAccountID) " + 
            "VALUES ($1, $2, $3, $4, $5) ",
            [presetName, presetPreamble, presetSep, presetPostamble, userID]
        );
        presetID = presetCreation.presetid;
        res.status(200).json({
            status: "success",
        });
        return res;
    } catch (err) {
        console.log(err);
    };
});

function constructPresetUpdate(updateData, presetID) {
    queryString = "UPDATE Preset SET";
    queryValues = [];
    var valueCounter = 0;
    for (let key in updateData) {
        if (key !== null) {
            valueCounter++;
            queryString = queryString + " " + key + " = " + "$" + valueCounter + ",";
            queryValues.push(updateData[key])
        }
    };
    if (valueCounter === 0) {
        return "";
    };
    queryString = queryString.slice(0,-1);
    valueCounter++;
    queryString = queryString + " WHERE PresetID = $" + valueCounter;
    queryValues.push(presetID)
    return {text: queryString, values: queryValues};
};

router.post("/update/:presetID", async (req, res) => {
    try {
        presetID = req.params.presetID;
        updateData = {
            Name: req.body.newPresetName,
            Preamble: req.body.newPresetPreamble,
            Sep: req.body.newPresetSep,
            Postamble: req.body.newPresetPostamble
        };
        query = constructPresetUpdate(updateData, presetID);
        const presetUpdateResult = await db.query(query);
        res.status(200).json({
            status: "success",
        });
        
    } catch (err) {
        console.log(err);
    };
});

router.post("/delete/:presetID", async (req, res) => {
    try {
        presetID = req.params.presetID;
        console.log(presetID);
        await db.query(
            "DELETE FROM Preset " + 
            "WHERE PresetID = $1",
            [presetID]
        );
        res.status(200).json({
            status: "success",
        });
        return res;
    } catch(err) {
        console.log(err);
    };
});

module.exports = router;
