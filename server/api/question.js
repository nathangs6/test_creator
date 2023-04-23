// question.js - Collection route module
const express = require("express");
const db = require("../db");
const { getUserID } = require("./scripts/user.js");
const router = express.Router();

router.post("/new/:username", async (req, res) => {
    // create new question
    try {
        userID = await getUserID(req.params.username);
        subCollectionID = req.query.subCollectionID;
        name = req.body.newQuestionName;
        content = req.body.newQuestionContent;
        source = req.body.newQuestionSource;

        const questionCreationResult = await db.query(
            "INSERT INTO Question (Name, Content, Source) " + 
            "VALUES ($1, $2, $3) " + 
            "RETURNING QuestionID",
            [name, content, source]
        );
        newQuestionID = questionCreationResult.rows[0].questionid;

        await db.query(
            "INSERT INTO JunctionUserAccountQuestion (UserAccountID, QuestionID) " + 
            "VALUES ($1, $2)",
            [userID, newQuestionID]
        );
        await db.query(
            "INSERT INTO JunctionSubCollectionQuestion (SubCollectionID, QuestionID) " + 
            "VALUES ($1, $2)",
            [subCollectionID, newQuestionID]
        );
        res.status(200).json({
            status: "success",
            data: {
                newQuestionID: newQuestionID
            }
        });
        return res;
    } catch(err) {
        console.log(err);
    };
});
function constructQuestionUpdate(updateData, questionID) {
    queryString = "UPDATE Question SET";
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
    queryString = queryString + " WHERE QuestionID = $" + valueCounter;
    queryValues.push(questionID)
    return {text: queryString, values: queryValues};
};

router.post("/update/:questionID", async (req, res) => {
    // update question
    try {
        questionID = req.params.questionID;
        updateData = {
            Name: req.body.newQuestionName,
            Content: req.body.newQuestionContent,
            Source: req.body.newQuestionSource
        };

        query = constructQuestionUpdate(updateData, questionID);
        const questionUpdateResult = await db.query(query);
        res.status(200).json({
            status: "success",
        });
        return res;
    } catch(err) {
        console.log(err);
    };
});

router.post("/delete/:questionID", async (req, res) => {
    // delete question from subcollection
    // don't forget to check whether it can be deleted from the user as well
    // don't forget to check whether it is orphaned (if needed? it might not be needed)
    try {
        questionID = req.params.questionID;
        await db.query(
            "DELETE FROM Question " +
            "WHERE QuestionID = $1",
            [questionID]
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
