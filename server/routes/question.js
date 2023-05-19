// question.js - Question route module
const express = require("express");
const db = require("../db");
const { getUserID } = require("./scripts/user.js");
const { generateTest } = require("./scripts/generateTest.js");
const { getSubCollectionQuestions } = require("./scripts/question.js");
const { renameKey } = require("./scripts/formatData.js");
const router = express.Router();

router.get("/:subCollectionID", async (req, res) => { 
    try {
        const subCollectionID = req.params.subCollectionID;
        await QuestionService.getQuestions(subCollectionID);
    } catch(err) {
        console.log(err)
    };
});

router.post("/new/:username", async (req, res) => {
    // create new question
    try {
        const username = req.params.username;
        const subCollectionID = req.body.subCollectionID;
        const questionData = {
            name = req.body.newQuestionName;
            content = req.body.newQuestionContent;
            source = req.body.newQuestionSource;
        }
        await QuestionService.createQuestion(username, subCollectionID, questionData);
    } catch(err) {
        console.log(err);
    };
});

router.put("/update/:questionID", async (req, res) => {
    // update question
    try {
        const questionID = req.params.questionID;
        const updateData = {
            name: req.body.newQuestionName,
            content: req.body.newQuestionContent,
            source: req.body.newQuestionSource
        };
        await QuestionService.updateQuestion(questionID, updateData);
    } catch(err) {
        console.log(err);
    };
});

router.delete("/delete/:questionID", async (req, res) => {
    // delete question from subcollection
    // don't forget to check whether it can be deleted from the user as well
    // don't forget to check whether it is orphaned (if needed? it might not be needed)
    try {
        const questionID = req.params.questionID;
        await QuestionService.deleteQuestion(questionID);
    } catch(err) {
        console.log(err);
    };
});

module.exports = router;
