const db = require("../../db");
const fs = require("fs/promises");
const shell = require("shelljs");

async function generateTest(presetID, subCollectionChoices, minWait) {
    // Input:
    //      - subCollectionChoices: a list of the form [id: number of questions]
    //      - minWait: Time span (for example, a week)
    const outputFile = 'practiceTest.tex';
    var testString = "";
    var preset = await db.query("SELECT * FROM Preset WHERE PresetID = $1", [presetID]);
    preset = preset.rows[0];
    if (preset === undefined) {
        console.log("Preset not found!");
        return false;
    };
    testString = testString + preset.preamble + "\n";
    var finalQuestionIDList = [];
    for (subCollectionID in subCollectionChoices) {
        var numQuestions = subCollectionChoices[subCollectionID];
        var questionExtract = await db.query("SELECT QuestionID " + 
                                            "FROM JunctionSubCollectionQuestion " + 
                                            "WHERE SubCollectionID = $1",
                                            [subCollectionID]);
        var questionIDList = questionExtract.rows.map(({ questionid }) => questionid);
        var selectedQuestionIDs = randomSelection(questionIDList,numQuestions);
        if (selectedQuestionIDs.length !== numQuestions) {
            console.log("Too many questions asked for!");
            return false;
        };
        finalQuestionIDList = finalQuestionIDList.concat(selectedQuestionIDs);
    };
    finalQuestionIDList.sort(function(){return 0.5 - Math.random()});

    for (let idx = 0; idx < finalQuestionIDList.length; idx++) {
        let questionID = finalQuestionIDList[idx];
        let question = await db.query("SELECT * FROM Question WHERE QuestionID=$1", [questionID]);
        question = question.rows[0];
        testString = testString + "Question " + (idx+1) + ": " + question.content + "\n";
        testString = testString + preset.sep + "\n";
    };

    testString = testString + preset.postamble;

    try {
        await fs.writeFile('/home/yewlkang/github/test_creator/server/api/scripts/practiceTest.tex', testString);
        shell.exec('./api/scripts/compile.sh');
    } catch(err) {
        console.log(err);
        return false;
    }
    return testString;
};

function randomSelection(arr, count) {
    arr.sort(function(){return 0.5 - Math.random()});
    return arr.slice(0,count);
};

module.exports = { generateTest };
