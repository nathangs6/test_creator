const QuestionModel = require("../models/questionModel.js");

class QuestionService {
    async getQuestions(subCollectionID) {
        const questionData = await QuestionModel.getQuestionsInSubCollection(subCollectionID);
        return questionData;
    };

    async createQuestion(userID, subCollectionID, questionData) {
        const newQuestion = await QuestionModel.createQuestion(userID, subCollectionID, questionData.name, questionData.content, questionData.source);
        return newQuestion;
    };

    async updateQuestion(questionID, updateData) {
        return await QuestionModel.updateQuestion(questionID, updateData.name, updateData.content, updateData.source);
    };

    async deleteOrphanedQuestions() {
    };

    async deleteQuestion(questionID) {
        await QuestionModel.deleteQuestion(questionID);
    };
};

module.exports = new QuestionService();
