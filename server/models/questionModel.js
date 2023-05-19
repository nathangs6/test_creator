const db = require("../db");
const { renameKey } = require("./formatData.js");

class QuestionModel {
    async getQuestionsInSubCollection(subCollectionID) {
        const subCollectionQuestions = await db.query(
            "SELECT Question.QuestionID, Question.Name, Content, Question.Source " + 
            "FROM Question " + 
            "INNER JOIN JunctionSubCollectionQuestion " + 
            "ON JunctionSubCollectionQuestion.QuestionID = Question.QuestionID " +
            "WHERE JunctionSubCollectionQuestion.SubCollectionID = $1",
            [subCollectionID]
        );
        const questionData = subCollectionQuestions.rows;
        for (var i = 0; i < questionData.length; i++) {
            renameKey(questionData[i], "questionid", "id");
        };
        return questionData;
    };

    async createQuestion(userID, subCollectionID, name, content, source) {
        const newQuestionQuery = await db.query(
            "INSERT INTO Question (Name, Content, Source) " + 
            "VALUES ($1, $2, $3) " + 
            "RETURNING *",
            [name, content, source]
        );
        const newQuestion = newQuestionQuery.rows[0];
        const newQuestionID = newQuestion.questionid;

        await db.query(
            "INSERT INTO JunctionUserAccountQuestion (UserAccountID, QuestionID) " + 
            "VALUES ($1, $2)",
            [userID, newQuestionID]
        )
        await db.query(
            "INSERT INTO JunctionSubCollectionQuestion (SubCollectionID, QuestionID) " + 
            "VALUES ($1, $2)",
            [subCollectionID, newQuestionID]
        );

        renameKey(newQuestion, "questionid", "id");
        return newQuestion;
    };

    async updateQuestion(questionID, name, content, source) {
        const questionUpdate = await db.query(
            "UPDATE Question SET " +
            "Name = $1, " + 
            "Content = $2, " + 
            "Source = $3 " + 
            "WHERE QuestionID = $4 " +
            "RETURNING *",
            [name, content, source, questionID]);
        const updatedQuestion = questionUpdate.rows[0];
        renameKey(updatedQuestion, "questionid", "id");
        return updatedQuestion;
    };

    async deleteOrphanedQuestions() {
    };

    async deleteQuestion(questionID) {
        await db.query(
            "DELETE FROM Question " +
            "WHERE QuestionID = $1",
            [questionID]
        );
    };
};

module.exports = new QuestionModel();
