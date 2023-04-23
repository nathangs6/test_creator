const db = require("../../db");

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
    return questionData;
};

module.exports = { getSubCollectionQuestions };
