const UserService = require("../services/userService.js");
const QuestionModel = require("../models/questionModel.js");

export default class QuestionService() {
    async getQuestions(subCollectionID) {
        const questionData = await getQuestionsInSubCollection(subCollectionID);
        return questionData;
    };

    async createQuestion(userID, subCollectionID, questionData) {
        await QuestionModel.createQuestion(userID, subCollectionID, questionData.name, questionData.content, questionData.source);
    };

    async updateQuestion(questionID, updateData) {
        await QuestionModel.updateQuestion(questionID, updateData.name, updateData.content, updateData.source);
    };

    async deleteOrphanedQuestions() {
    };

    async deleteQuestion(questionID) {
        await QuestionModel.deleteQuestion(questionID);
    };
};
