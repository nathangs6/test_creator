const db = require("../../db");
const fs = require("fs/promises");
const shell = require("shelljs");

async function generateTest(username, presetID, subCollectionChoices, minWait) {
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
    questionIDList = await getQuestionList(subCollectionChoices);
    testString = await generateTestString(preset, questionIDList);
    try {
        const filePath = '/home/yewlkang/github/test_creator/server/api/scripts/output/' + username + 'PracticeTest.tex';
        await fs.writeFile(filePath, testString);
        shell.exec('./api/scripts/compile.sh ' + filePath);
    } catch(err) {
        console.log(err);
        return false;
    }
    return testString;
};

async function getQuestionList(subCollectionChoices) {
    let finalQuestionIDList = [];
    let numQuestions;
    let questionExtract;
    let questionIDList;
    let selectedQuestionIDs;
    for (let subCollectionID in subCollectionChoices) {
        numQuestions = subCollectionChoices[subCollectionID];
        questionExtract = await db.query("SELECT QuestionID " + 
                                            "FROM JunctionSubCollectionQuestion " + 
                                            "WHERE SubCollectionID = $1",
                                            [subCollectionID]);
        questionIDList = questionExtract.rows.map(({ questionid }) => questionid);
        selectedQuestionIDs = randomSelection(questionIDList,numQuestions);
        if (selectedQuestionIDs.length !== numQuestions) {
            console.log("Too many questions asked for!");
            return false;
        };
        finalQuestionIDList = finalQuestionIDList.concat(selectedQuestionIDs);
    };
    return finalQuestionIDList;
};

async function generateTestString(preset, questionList) {
    let testString = "";
    let questionID;
    let question;
    testString += preset.preamble + "\n";
    for (let idx = 0; idx < questionList.length; idx++) {
        questionID = questionList[idx];
        question = await db.query("SELECT * FROM Question WHERE QuestionID=$1", [questionID]);
        question = question.rows[0];
        testString += "Question " + (idx+1) + ": " + question.content + "\n\n";
        testString += preset.sep + "\n\n";
    };
    testString += preset.postamble;
    return testString;
};

function randomSelection(arr, count) {
    arr.sort(function(){return 0.5 - Math.random()});
    return arr.slice(0,count);
};

module.exports = { generateTest };
