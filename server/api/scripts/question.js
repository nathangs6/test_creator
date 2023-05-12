const db = require("../../db");
const { renameKey } = require("./formatData.js");

async function getSubCollectionQuestions(subCollectionID) {
    const subCollectionQuestions = await db.query(
        "SELECT Question.QuestionID, Question.Name, Content, Question.Source " + 
        "FROM Question " + 
        "INNER JOIN JunctionSubCollectionQuestion " + 
        "ON JunctionSubCollectionQuestion.QuestionID = Question.QuestionID " +
        "WHERE JunctionSubCollectionQuestion.SubCollectionID = $1",
        [subCollectionID]
    );
    questionData = subCollectionQuestions.rows;
    for (var i = 0; i < questionData.length; i++) {
        renameKey(questionData[i], "questionid", "id");
    };
    return questionData;
};

module.exports = { getSubCollectionQuestions };
