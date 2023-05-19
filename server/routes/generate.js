const express = require("express");
const db = require("../db");
const { generateTest } = require("./scripts/generateTest.js");
const { formatChoiceObject } = require("./scripts/formatData.js");
const router = express.Router();

router.post("/:username", async (req, res) => {
    const username = req.params.username;
    const presetID = req.body.testSelection.presetSelection;
    var subCollectionChoices = req.body.testSelection;
    delete subCollectionChoices["presetSelection"];
    console.log(presetID);
    console.log(subCollectionChoices);
    formatChoiceObject(subCollectionChoices, '0');
    console.log(subCollectionChoices);
    const testString = await generateTest(username, presetID, subCollectionChoices, 0);
    res.status(200).json({
        status: "success",
        data: {
            output: testString
        }
    });
    return res;
});

router.get("/download/:username", async (req, res) => {
    console.log("Downloading");
    const username = req.params.username;
    try {
        filePath = './api/scripts/output/' + username + 'PracticeTest.pdf';
        console.log(filePath);
        //res.download(filePath, function (error) {
        //    console.log("Error: ", error)
        //});
        res.download(filePath);
    } catch(err) {
        console.log(err);
    };
});

router.post("/test", async (req, res) => {
    console.log(req.body.testSelection);
});

router.get("/test2", async (req, res) => {
    var file = res.download('./api/scripts/output/practiceTest.pdf');
});

router.post("/test", async (req, res) => {
    console.log(req.body.subCollectionCount1);
    console.log(req.body);
    try {
        data = {
            "5": 2
        }
        const testString = await generateTest(4, data, 0);
        res.status(200).json({
            status: "success",
            data: {
                output: testString
            }
        });

    } catch(err) {
        console.log(err);
    }
});

module.exports = router;
