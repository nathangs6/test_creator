const db = require("../db");
const { renameKey } = require("./formatData.js");

export default class QuestionModel() {
    async getQuestions(subCollectionID) {
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

    async createQuestion(username, subCollectionID, name, content, source) {
        const newQuestion = await db.query(
            "INSERT INTO Question (Name, Content, Source) " + 
            "VALUES ($1, $2, $3) " + 
            "RETURNING *",
            [name, content, source]
        );
        newQuestionID = newQuestion.rows[0].questionid;

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
    };

    async updateQuestion(questionID, name, content, source) {
        await db.query(
            "UPDATE Question SET " +
            "Name = $1 " + 
            "Content = $2 " + 
            "Source = $3 " + 
            "WHERE QuestionID = $4",
            [name, content, source, questionID]);
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
