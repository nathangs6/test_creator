const fs = require("fs/promises");
const shell = require("shelljs");
const PresetModel = require("../models/presetModel");
const QuestionModel = require("../models/questionModel");

class GenerateService {
    formatChoiceObject(obj) {
        let key;
        let newKey;
        for (key in obj) {
            if (obj[key] === '0') {
                delete obj[key]
            } else {
                newKey = key.match(/(\d+)/g);
                obj[newKey] = Number(obj[key]);
                delete obj[key];
            }
        }
    }

    randomSelection(arr, count) {
        arr.sort(function(){return 0.5 - Math.random()});
        return arr.slice(0,count);
    };

    async getQuestionList(subCollectionChoices) {
        let finalQuestionIDList = [];
        let numQuestions;
        let questionExtract;
        let questionIDList;
        let selectedQuestionIDs;
        for (let subCollectionID in subCollectionChoices) {
            numQuestions = subCollectionChoices[subCollectionID];
            questionIDList = await QuestionModel.getQuestionIDsInSubCollection(subCollectionID);
            selectedQuestionIDs = this.randomSelection(questionIDList,numQuestions);
            if (selectedQuestionIDs.length !== numQuestions) {
                throw new Error("Too many questions asked for!");
            };
            finalQuestionIDList = finalQuestionIDList.concat(selectedQuestionIDs);
        };
        finalQuestionIDList.sort(function(){return 0.5 - Math.random()});
        return finalQuestionIDList;
    };

    async generateTestString(preset, questionList) {
        let testString = "";
        let questionID;
        let question;
        testString += preset.preamble + "\n";
        for (let idx = 0; idx < questionList.length; idx++) {
            questionID = questionList[idx];
            question = await QuestionModel.getQuestion(questionID);
            testString += "Question " + (idx+1) + ": " + question.content + "\n\n";
            testString += preset.sep + "\n\n";
        };
        testString += preset.postamble;
        return testString;
    };

    async generateTest(username, choiceData) {
        // Make data
        const presetID = choiceData.presetSelection;
        delete choiceData["presetSelection"];
        this.formatChoiceObject(choiceData);

        var testString = "";

        // Get preset
        var preset;
        try {
            preset = await PresetModel.getPreset(presetID);
        } catch(err) {
            console.log(err);
            return null;
        };
        if (!preset) {
            console.log("Preset is " + preset);
            return null;
        }

        // Make question list
        var questionIDList;
        try {
            questionIDList = await this.getQuestionList(choiceData);
        } catch(err) {
            throw new Error(err.message);
        };
        if (!questionIDList) {
            console.log("Null: Something went wrong!");
            return null;
        }

        // Construct tex file and compile pdf
        try {
            testString = await this.generateTestString(preset, questionIDList);
        } catch(err) {
            console.log(err);
        };
        try {
            const filePath = '/app/scripts/output/' + username + 'PracticeTest.tex';
            console.log("Writing to " + filePath);
            await fs.writeFile(filePath, testString);
            console.log("Compiling");
            await shell.exec('./scripts/compile.sh ' + filePath);
        } catch(err) {
            console.log(err);
            return null;
        }
        console.log("Done");
        return true;
    }

    async getDownloadPath(username) {
        const filePath = './scripts/output/' + username + 'PracticeTest.pdf';
        return filePath
    }

    async removeFiles(username) {
        await shell.exec('rm ./scripts/output/' + username + '*');
    }
}

module.exports = new GenerateService();
