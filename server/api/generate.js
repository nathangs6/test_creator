const express = require("express");
const db = require("../db");
const { generateTest } = require("./scripts/generateTest.js");
const { formatChoiceObject } = require("./scripts/formatData.js");
const router = express.Router();

router.post("/", async (req, res) => {
    const presetID = req.body.presetSelection;
    var subCollectionChoices = req.body;
    delete subCollectionChoices["presetSelection"];
    formatChoiceObject(subCollectionChoices, '0');
    console.log(subCollectionChoices);
    const testString = await generateTest(presetID, subCollectionChoices, 0);
    res.download('./api/scripts/output/practiceTest.pdf', function (error) {
        console.log("Error: ", error)
    });
    res.status(200).json({
        status: "success",
        data: {
            output: testString
        }
    });
    return res;
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
